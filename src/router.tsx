import { QueryClient } from "@tanstack/react-query";
import { createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Hash history est le seul choix fiable pour Capacitor / WebView iOS
const history = createHashHistory();

export const router = createRouter({
  routeTree,
  history,
  context: { queryClient: undefined as unknown as QueryClient },
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});