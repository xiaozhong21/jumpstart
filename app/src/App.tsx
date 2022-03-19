import * as React from "react";

import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Nav from "./components/Nav";
import DashboardController from "./pages/Dashboard/DashboardController";
import FundingFormController from "./pages/FundingForm/FundingFormController";
import ProjectDetailsController from "./pages/ProjectDetails/ProjectDetailsController";
import ProjectFormController from "./pages/ProjectForm/ProjectFormController";
import ProjectListController from "./pages/ProjectList/ProjectListController";
import useProtectedApi from "./services/apiClients/useProtectedApi";
import useAuth0 from "./services/auth/useAuth0";
import { Protected } from "./services/auth/widgets";
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
      <div className="content">
        <header>
          <Nav />
        </header>
        <main>
          <Container>
            <Elements stripe={promise}>
              <Routes>
                <Route path="/" element={<ProjectListController />} />
                <Route path="/projects" element={<ProjectListController />} />
                <Route
                  path="/projects/:projectId"
                  element={<ProjectDetailsController />}
                />
                <Route
                  path="/projects/:projectId/fund"
                  element={<FundingFormController />}
                />
                <Route
                  path="/addProject"
                  element={<Protected component={ProjectFormController} />}
                />
                <Route
                  path="/dashboard"
                  element={<Protected component={DashboardController} />}
                />
                <Route
                  path="/projects/:projectId/edit"
                  element={<Protected component={ProjectFormController} />}
                />
                <Route path="/*" element={<ProjectListController />} />
              </Routes>
            </Elements>
          </Container>
        </main>
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
