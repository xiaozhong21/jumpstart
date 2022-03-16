import * as React from "react";

import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ProjectCard from "../components/ProjectCard";
import * as apiClient from "../services/apiClient";
import { Project } from "../utils/types";

const Dashboard = () => {
  const [creatorProjects, setCreatorProjects] = React.useState<Project[]>([]);
  const creatorId = 1;
  const creator = true;

  const loadCreatorProjects = async () =>
    setCreatorProjects(await apiClient.getCreatorProjects(creatorId));

  React.useEffect(() => {
    loadCreatorProjects();
  }, []);

  return (
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
              creator={creator}
              {...{ loadCreatorProjects }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
