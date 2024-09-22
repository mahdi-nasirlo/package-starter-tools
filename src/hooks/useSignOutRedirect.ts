import { useAuth } from "oidc-react";

const useSignOutRedirect = () => {
  const { signOutRedirect, userData } = useAuth();

  const fn = () =>
    signOutRedirect({
      id_token_hint: userData?.id_token,
      post_logout_redirect_uri: window.location.href,
    });

  return fn;
};

export default useSignOutRedirect;
