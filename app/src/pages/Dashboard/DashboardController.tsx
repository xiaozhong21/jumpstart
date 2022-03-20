import * as React from "react";

import useProtectedApi from "../../services/apiClients/useProtectedApi";
import useAuth0 from "../../services/auth/useAuth0";
import { Project } from "../../utils/types";

import DashboardView from "./DashboardView";

const DashboardController = () => {
  const { loading, apiClient } = useProtectedApi();
  const { isAuthenticated } = useAuth0();

  const [creatorProjects, setCreatorProjects] = React.useState<Project[]>([]);

  const loadCreatorProjects = React.useCallback(
    async () =>
      setCreatorProjects(apiClient && (await apiClient.getCreatorProjects())),
    [apiClient],
  );

  React.useEffect(() => {
    if (!loading) {
      loadCreatorProjects();
    }
  }, [loading, loadCreatorProjects]);

  return (
    <DashboardView
      creatorProjects={creatorProjects}
      isAuthenticated={isAuthenticated}
      loadCreatorProjects={loadCreatorProjects}
    />
  );
};

export default DashboardController;
