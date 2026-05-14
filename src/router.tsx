import { QueryClient } from "@tanstack/react-query";
import { createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Hash history is the safest choice for Capacitor / iOS WebView:
// the WebView serves files from capacitor://localhost and a normal browser
// history would 404 on deep refresh inside the app shell.
const history = createHashHistory();

export const router = createRouter({
  routeTree,
  history,
  context: { queryClient: undefined as unknown as QueryClient },
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});
