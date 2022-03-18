import * as React from "react";

import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Routes, Route } from "react-router-dom";

import useProtectedApi from "./services/apiClients/useProtectedApi";
import useAuth0 from "./services/auth/useAuth0";
import { Protected } from "./services/auth/widgets";
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import FundingForm from "./pages/FundingForm";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectForm from "./pages/ProjectForm";
import Projects from "./pages/Projects";
import "./App.css";
import theme from "./utils/theme";

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const { loading, apiClient } = useProtectedApi();

  const promise =
    process.env.REACT_APP_STRIPE_KEY !== undefined
      ? loadStripe(process.env.REACT_APP_STRIPE_KEY)
      : null;

  React.useEffect(() => {
    if (isAuthenticated && !loading && apiClient) {
      apiClient.addOrUpdateUser(user);
    }
  }, [isAuthenticated, user, loading, apiClient]);

  return (
    <ThemeProvider {...{ theme }}>
      <Nav />
      <Container>
        <Elements stripe={promise}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="/projects/:projectId/fund" element={<FundingForm />} />
            <Route
              path="/addProject"
              element={<Protected component={ProjectForm} />}
            />
            <Route
              path="/dashboard"
              element={<Protected component={Dashboard} />}
            />
            <Route
              path="/projects/:projectId/edit"
              element={<Protected component={ProjectForm} />}
            />
          </Routes>
        </Elements>
      </Container>
    </ThemeProvider>
  );
};

export default App;
