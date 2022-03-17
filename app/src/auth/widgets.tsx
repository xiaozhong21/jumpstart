import * as React from "react";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ProtectedRouteProps } from "../utils/types";

import useAuth0 from "./useAuth0";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={loginWithRedirect}>Log In</button>;
};

export const Logout = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export const Protected: React.FC<ProtectedRouteProps> = ({
  component,
  ...props
}) => {
  const Component = React.useMemo(
    () => withAuthenticationRequired(component),
    [component],
  );
  return <Component {...props} />;
};
