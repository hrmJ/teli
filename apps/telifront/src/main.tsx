import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import Keycloak from "keycloak-js";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new router instance
const router = createRouter({ routeTree, basepath: import.meta.env.BASE_URL });
const queryClient = new QueryClient();

export const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "teli",
  clientId: "teli-front",
});

const authenticated = await keycloak.init({
  // onLoad: "login-required",
  onLoad: "check-sso",
  pkceMethod: "S256",
  checkLoginIframe: false,
});

if (!authenticated) {
  await keycloak.login();
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
