import * as React from "react";

import { Box, Grid } from "@mui/material";

import ProjectCard from "../components/ProjectCard";
import * as apiClient from "../services/apiClient";
import { Project } from "../utils/types";

const Projects = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);

  const loadProjects = async () => setProjects(await apiClient.getProjects());

  React.useEffect(() => {
    loadProjects();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {projects.map((project: Project) => (
          <Grid item xs={2} sm={4} md={4} key={project.project_id}>
            <ProjectCard
              projectId={project.project_id}
              title={project.title}
              description={project.description}
              label={project.label}
              imageUrl={project.image_url}
              fundingGoal={project.funding_goal}
              totalFundings={project.total_fundings}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
