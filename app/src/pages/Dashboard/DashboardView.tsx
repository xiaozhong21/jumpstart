import { Box, Grid, Typography } from "@mui/material";

import ProjectCard from "../../components/ProjectCard";
import { Project, DashboardViewProps } from "../../utils/types";

const DashboardView = ({
  creatorProjects,
  isAuthenticated,
  loadCreatorProjects,
}: DashboardViewProps) =>
  !creatorProjects.length ? (
    <Typography>You have not added any projects yet</Typography>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {creatorProjects.map((project: Project) => (
          <Grid item xs={12} sm={4} md={4} key={project.project_id}>
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

export default DashboardView;
