import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// FORCER l'inclusion de l'aspiration Winamax / IA
import { analyzeTicket } from "./server-api/analyze-ticket";
(window as any).analyzeTicket = analyzeTicket;

import "./styles.css";
import { router } from "./router";

const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root not found");

createRoot(rootEl).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ queryClient }} />
    </QueryClientProvider>
  </StrictMode>,
);

// Cache le splash screen
window.setTimeout(() => {
  const el = document.getElementById("fcd-boot");
  if (!el) return;
  el.classList.add("hide");
  window.setTimeout(() => el.remove(), 400);
}, 250);