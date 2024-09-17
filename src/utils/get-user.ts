// import { TUserInfo } from "@/hooks/use-get-user-info";
import { User } from "oidc-react";
// import { z } from "zod";

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

// function getUserInfo() {
//   if (typeof window !== "undefined") {
//     const userInfo = localStorage.getItem(`userInfo`);

//     if (!userInfo) {
//       return null;
//     }

//     try {
//       return JSON.parse(userInfo) as TUserInfo;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }

//   return null;
// }

export { getUser };
