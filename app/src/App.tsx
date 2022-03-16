import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import AddProject from "./pages/AddProject";
import Dashboard from "./pages/Dashboard";
import FundingForm from "./pages/FundingForm";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import Projects from "./pages/Projects";
import "./App.css";
import theme from "./utils/theme";

const App = () => {
  const promise =
    process.env.REACT_APP_STRIPE_KEY !== undefined
      ? loadStripe(process.env.REACT_APP_STRIPE_KEY)
      : null;

  return (
    <ThemeProvider {...{ theme }}>
      <Nav />
      <Container>
        <Elements stripe={promise}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="/addProject" element={<AddProject />} />
            <Route path="/projects/:projectId/fund" element={<FundingForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects/:projectId/edit" element={<AddProject />} />
          </Routes>
        </Elements>
      </Container>
    </ThemeProvider>
  );
};

export default App;
