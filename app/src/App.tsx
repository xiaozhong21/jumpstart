import { Routes, Route } from "react-router-dom";

import AddProject from "./AddProject";
import Home from "./Home";
import Nav from "./Nav";
import Projects from "./Projects";

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
