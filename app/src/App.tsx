import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import AddProject from "./pages/AddProject";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import Projects from "./pages/Projects";
import "./App.css";
import theme from "./utils/theme";

const App = () => {
  return (
    <ThemeProvider {...{ theme }}>
      <Nav />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/addProject" element={<AddProject />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
