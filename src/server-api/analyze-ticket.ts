import { z } from "zod";

const LOVABLE_API_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

interface NormalizedPick {
  match: string;
  teamA: string;
  teamB: string;
  option: string;
  type: string;
  odds: number;
}

function cleanJsonText(content: string) {
  // Correction : Expression régulière sur une seule ligne pour éviter "Unterminated regular expression"
  return content.replace(/^```(?:json)?/i, "").replace(/
```$/i, "").trim();
}

function splitTeams(match: string) {
  const parts = match.split(/\s+(?:vs\.?|v\.?|contre|—|–|-)\s+/i);
  return {
    teamA: (parts[0] || match || "Équipe A").trim(),
    teamB: (parts[1] || "Équipe B").trim(),
  };
}

function toNumber(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  if (typeof value !== "string") return undefined;
  const parsed = Number(value.replace(",", ".").replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeTicket(raw: Record<string, unknown>) {
  const root = (raw.ticket && typeof raw.ticket === "object" ? raw.ticket : raw) as Record<string, unknown>;
  const source = Array.isArray(root.picks)
    ? root.picks
    : Array.isArray(root.selections)
      ? root.selections
      : [];

  const picks: NormalizedPick[] = source
    .map((item) => {
      const pick = (item ?? {}) as Record<string, unknown>;
      const match = String(pick.match || pick.fixture || pick.event || "").trim();
      const teams = splitTeams(match);
      const odds = toNumber(pick.odds || pick.cote || pick.price);
      if (!match || !odds || odds < 1.01) return null;
      return {
        match,
        teamA: String(pick.teamA || pick.homeTeam || teams.teamA).trim(),
        teamB: String(pick.teamB || pick.awayTeam || teams.teamB).trim(),
        option: String(pick.option || pick.selection || pick.pick || "Sélection").trim(),
        type: String(pick.type || pick.market || pick.betType || "Pari").trim(),
        odds,
      } satisfies NormalizedPick;
    })
    .filter((pick): pick is NormalizedPick => pick !== null);

  return {
    bookmaker: typeof root.bookmaker === "string" ? root.bookmaker : undefined,
    stake: toNumber(root.stake || root.mise),
    totalOdds: toNumber(root.totalOdds || root.coteTotale || root.total_odds),
    picks,
  };
}

const _analyzeTicketSchema = z.object({
  text: z.string().optional(),
  fileBase64: z.string().optional(),
  mimeType: z.string().optional(),
});

export async function analyzeTicket(rawInput: unknown) {
  const data = _analyzeTicketSchema.parse(rawInput);
  const LOVABLE_API_KEY = (typeof localStorage !== "undefined" && localStorage.getItem("magic.gemini_key")) || "";
  if (!LOVABLE_API_KEY) throw new Error("Aucune clé Gemini configurée (Paramètres)");

  const text = (data.text || "").trim();
  const dataUrl = data.fileBase64 ? (data.fileBase64.startsWith("data:") ? data.fileBase64 : `data:${data.mimeType || "image/jpeg"};base64,${data.fileBase64}`) : "";

  if (!text && !dataUrl) throw new Error("Aucun ticket à lire");

  const userContent: Array<Record<string, unknown>> = [
    {
      type: "text",
      text:
        "Lis le ticket de pari sportif fourni. Tu dois extraire tous les paris visibles, même si la photo est inclinée, sombre, partiellement floue ou contient plusieurs colonnes. " +
        "Réponds uniquement avec ce JSON STRICT, sans markdown: " +
        '{"bookmaker":string|null,"stake":number|null,"totalOdds":number|null,"picks":[{"match":string,"teamA":string,"teamB":string,"type":string,"option":string,"odds":number}]}. ' +
        "Normalise les cotes en nombre décimal, sépare les équipes, et n'invente pas de pari invisible. Texte collé si présent:\n" +
        text,
    },
  ];

  // Correction : Ajout de ); pour fermer correctement le push
  if (dataUrl) userContent.push({ type: "image_url", image_url: { url: dataUrl } });

  const aiResp = await fetch(LOVABLE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: dataUrl ? "google/gemini-2.5-flash" : "google/gemini-2.5-flash-lite",
      messages: [
        { role: "system", content: "Tu es un OCR expert de tickets de paris sportifs. Tu réponds uniquement en JSON valide." },
        { role: "user", content: userContent }
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!aiResp.ok) throw new Error(`Lecture IA impossible (${aiResp.status})`);

  const aiJson = await aiResp.json();
  const content = cleanJsonText(aiJson?.choices?.[0]?.message?.content || "{}");
  const parsed = JSON.parse(content);
  return normalizeTicket(parsed);
}
