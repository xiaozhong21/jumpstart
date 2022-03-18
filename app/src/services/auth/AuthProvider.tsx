import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const domain: string | undefined = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId: string | undefined = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience: string | undefined = process.env.REACT_APP_AUTH0_AUDIENCE;

const AuthProvider = (props: any) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  type AppState = {
    [key: string]: any;
    returnTo?: string | undefined;
  };

  return (
    <Auth0Provider
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
      useRefreshTokens
      {...{ domain, clientId, audience, onRedirectCallback, ...props }}
    />
  );
};

export default AuthProvider;
