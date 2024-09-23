import OidcAuthProvider from "./src/providers/oidc-auth-provider";
import useSignOutRedirect from "./src/hooks/useSignOutRedirect";
import { useAuth } from "oidc-react";

export { OidcAuthProvider as AuthProvider, useAuth, useSignOutRedirect };
