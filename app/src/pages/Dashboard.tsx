import * as React from "react";

import { Box, Grid, Typography } from "@mui/material";

import ProjectCard from "../components/ProjectCard";
import useProtectedApi from "../services/apiClients/useProtectedApi";
import useAuth0 from "../services/auth/useAuth0";
import { Project } from "../utils/types";

const Dashboard = () => {
  const { loading, apiClient } = useProtectedApi();
  const { isAuthenticated } = useAuth0();

  const [creatorProjects, setCreatorProjects] = React.useState<Project[]>([]);

  const loadCreatorProjects = React.useCallback(
    async () => setCreatorProjects(await apiClient.getCreatorProjects()),
    [apiClient],
  );

  React.useEffect(() => {
    if (!loading) {
      loadCreatorProjects();
    }
  }, [loading, loadCreatorProjects]);

  return !creatorProjects.length ? (
    <Typography>You have not added any projects yet</Typography>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {creatorProjects.map((project: Project) => (
          <Grid item xs={2} sm={4} md={4} key={project.project_id}>
            <ProjectCard
              projectId={project.project_id}
              title={project.title}
              description={project.description}
              label={project.label}
              imageUrl={project.image_url}
              fundingGoal={project.funding_goal}
              totalFundings={project.total_fundings}
              {...{ loadCreatorProjects }}
              isAuthenticated={isAuthenticated}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
