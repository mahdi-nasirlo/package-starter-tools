import { User } from "oidc-react";

function getUser() {
  if (typeof window !== "undefined") {
    const oidcStorage = sessionStorage.getItem(
      `oidc.user:${process.env.OIDC_AUTHORITY}:${process.env.OIDC_CLIENT_ID}`
    );

    if (!oidcStorage) {
      return null;
    }

    return User.fromStorageString(oidcStorage);
  }
  return null;
}

export default { getUser };
