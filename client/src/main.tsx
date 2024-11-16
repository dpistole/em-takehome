import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { buildTimeVariables } from "./buildTimeVariables.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // disable retrying in develop environment where we expect network
      // connection to be stable and would like to reduce devtools
      // console/network noise
      retry: buildTimeVariables.isDevelopmentEnvironment ? false : true,
    },
  },
});

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
