import { useAuth0 as useBaseAuth0, User } from "@auth0/auth0-react";
import { parseFullName } from "parse-full-name";

const useAuth0 = () => {
  const { isAuthenticated, user: _user, ...rest } = useBaseAuth0();
  const user = isAuthenticated ? decorateUser(_user) : _user;
  return { isAuthenticated, user, ...rest };
};

const decorateUser = (user: User | undefined) => {
  if (user && user.name) {
    const name = parseFullName(user.name);
    return {
      given_name: name.first,
      family_name: name.last,
      email: null,
      picture: null,
      sub: user?.sub,
    };
  }
};

export default useAuth0;
