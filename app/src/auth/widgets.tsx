import * as React from "react";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ProtectedRouteProps } from "../utils/types";

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
