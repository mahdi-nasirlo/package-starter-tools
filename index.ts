import getUser from "@/utils/get-user";
import OidcAuthProvider from "./src/providers/oidc-auth-provider";
import ProtectedPageRouter from "./src/providers/protected-page-provider";
import { useAuth } from "oidc-react";

export {
  OidcAuthProvider as AuthProvider,
  ProtectedPageRouter,
  useAuth,
  getUser,
};
