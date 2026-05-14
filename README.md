# FC d'Or — SPA Capacitor iOS

Conversion automatique depuis le projet TanStack Start original.

## Démarrage

```bash
npm install
npm run dev          # serveur dev Vite (web preview)
npm run build        # produit dist/ (consommé par Capacitor)
```

## iOS

```bash
npm run build
npx cap add ios      # une seule fois (génère ios/)
npx cap sync ios     # à chaque changement de web bundle
npx cap open ios     # ouvre Xcode
```

Le workflow GitHub Actions `.github/workflows/ios-build.yml` fait tout ça
sur `macos-latest` et publie un IPA non signé en artefact.

## Changements vs version Lovable / TanStack Start

- **Suppression** : `@tanstack/react-start`, `@cloudflare/vite-plugin`,
  `wrangler.jsonc`, `src/server.ts`, `src/start.ts`, `src/routes/api/`,
  `src/integrations/supabase/{auth-middleware,auth-attacher,client.server}.ts`,
  `@lovable.dev/vite-tanstack-config`.
- **Routing** : TanStack Router en mode **hash history** (`#/route`) — requis
  pour Capacitor (le WebView sert les fichiers depuis `capacitor://localhost`,
  une browser-history casserait sur deep link).
- **Server functions** : converties en fonctions async normales.
  - `fetchWinamaxFootball()` → fetch direct depuis le client.
    ⚠️ **CORS** : Winamax bloquera le fetch depuis un navigateur web standard.
    Sur Capacitor iOS, le fetch part avec l'origine `capacitor://localhost`
    et passe la plupart du temps. Si nécessaire, installer
    `@capacitor/core`'s `CapacitorHttp` pour bypass complet.
  - `analyzeMatches()` / `analyzeTicket()` : utilisent maintenant la clé
    Gemini stockée localement (`localStorage["magic.gemini_key"]`).
    L'utilisateur la saisit dans `/settings`.
    Sans clé : `analyzeMatches` retombe sur `fallbackPredictions`,
    `analyzeTicket` lève une erreur explicite.
- **Sync Supabase Cloud** : `supabaseAdmin` (service role) remplacé par le
  client anon. **À faire** : ajuster les RLS pour autoriser les inserts
  `wina_matches` / `wina_sports` / `wina_tournaments` ou retirer la sync.
- **Vite** : `base: './'` activé (anti-écran-noir Capacitor).
- **Index** : le HTML shell + boot splash sont maintenant dans `index.html`
  (au lieu du `shellComponent` TanStack Start).

## Ce qu'il reste probablement à faire à la main

1. `npm install` puis vérifier que `npm run build` passe (le typecheck strict
   peut révéler des oublis dans les call-sites convertis).
2. Tester la fetch Winamax depuis le simulateur iOS.
3. Configurer le signing iOS dans Xcode (équipe Apple Developer) avant tout
   build prod ; le workflow CI livre seulement un IPA non signé.
4. Vérifier que `localStorage` est bien la clé attendue par `cotes-engine.ts`
   pour Gemini (slot `magic.gemini_key`). Sinon, harmoniser avec
   `getGeminiKey()` / `setApiKeys()` existant.
