import { NavLink } from "react-router-dom";

const Nav = () => (
  <>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/projects">Projects</NavLink>
    <NavLink to="/addProject">JumpStart Your Project</NavLink>
  </>
);

export default Nav;
