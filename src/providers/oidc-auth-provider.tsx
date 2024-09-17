"use client";

import { ReactNode } from "react";
import { AuthProvider, AuthProviderProps } from "oidc-react";

type TProps = {
  children: any
} & AuthProviderProps


export default function OidcAuthProvider({ children, ...props }: TProps) {
  return (
    <AuthProvider {...props}>
      {children}
    </AuthProvider>
  );
}
