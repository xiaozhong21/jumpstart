import * as React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  AppBar,
  Container,
  Box,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";

import useAuth0 from "../services/auth/useAuth0";

const Nav = () => {
  const { isAuthenticated, user } = useAuth0();
  let userPic;
  if (user && user.picture) userPic = user.picture;

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const pages = [
    {
      label: "All Projects",
      link: "/projects",
    },
    { label: "JumpStart Your Project", link: "/addProject" },
    { label: "Dashboard", link: "/dashboard" },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (link: string) => {
    setAnchorElNav(null);
    navigate(link);
  };

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenuAndLogOut = () => {
    setAnchorElUser(null);
    logout({ returnTo: window.location.origin });
  };

  return (
    <Box sx={{ flexGrow: 1, height: 100 }}>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "#ffd700",
                fontFamily: "Monaco",
              }}
            >
              <NavLink to="/">JumpStart</NavLink>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={() => handleCloseNavMenu(page.link)}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                color: "#ffd700",
                fontFamily: "Monaco",
              }}
            >
              <NavLink to="/">JumpStart</NavLink>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page.link)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="your profile picture" src={userPic} />
                    </IconButton>
                  </Tooltip>
                  <Typography>Hello, {user?.given_name}</Typography>
                </Box>
              ) : (
                <Button
                  onClick={loginWithRedirect}
                  sx={{
                    my: 2,
                    color: "white",
                    backgroundColor: "#00b1ac",
                    display: "block",
                  }}
                >
                  Log In
                </Button>
              )}

              {isAuthenticated ? (
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <NavLink to="/dashboard">
                      <Typography textAlign="center">Dashboard</Typography>
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenuAndLogOut}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                </Menu>
              ) : null}
            </Box>

            {/* <NavLink to="/projects">
              <Button color="inherit">All Projects</Button>
            </NavLink>
            <NavLink to="/addProject">
              <Button color="inherit">JumpStart Your Project</Button>
            </NavLink>
            <NavLink to="/dashboard">
              <Button color="inherit">Dashboard</Button>
            </NavLink> */}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Nav;
