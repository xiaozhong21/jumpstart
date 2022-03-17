import { AppBar, Box, Toolbar, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import useAuth0 from "../auth/useAuth0";
import { Login, Logout } from "../auth/widgets";

const Nav = () => (
  <Box sx={{ flexGrow: 1, height: 100 }}>
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, color: "#ffd700", fontFamily: "Monaco" }}
        >
          <NavLink to="/">JumpStart</NavLink>
        </Typography>
        <NavLink to="/projects">
          <Button color="inherit">All Projects</Button>
        </NavLink>
        <NavLink to="/addProject">
          <Button color="inherit">JumpStart Your Project</Button>
        </NavLink>
        <NavLink to="/dashboard">
          <Button color="inherit">Dashboard</Button>
        </NavLink>
        <Auth />
      </Toolbar>
    </AppBar>
  </Box>
);

const Auth = () => {
  const { isAuthenticated, user } = useAuth0();
  let userPic;
  if (user && user.picture) userPic = user.picture;

  return isAuthenticated ? (
    <div>
      <img src={userPic} alt="" />
      Hello, {user?.given_name}
      <Logout />
    </div>
  ) : (
    <Login />
  );
};

export default Nav;
