import { Routes, Route } from "react-router-dom";

import AddProject from "./pages/AddProject";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Projects from "./pages/Projects";

// import './App.css';

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/addProject" element={<AddProject />} />
      </Routes>
    </>
  );
};

export default App;
