import getUser from "./src/utils/get-user";
import OidcAuthProvider from "./src/providers/oidc-auth-provider";
import { useAuth } from "oidc-react";

export {
  OidcAuthProvider as AuthProvider,
  useAuth,
  getUser,
};
