import { Box, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import ProjectCard from "../../components/ProjectCard";
import { Project, DashboardViewProps } from "../../utils/types";

const DashboardView = ({
  creatorProjects,
  isAuthenticated,
  loadCreatorProjects,
}: DashboardViewProps) =>
  !creatorProjects.length ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <Typography variant="h6">You have not added any projects yet</Typography>
      <Link to="/addProject">
        <Button>Create A Project</Button>
      </Link>
    </Box>
  ) : (
    <Box
      sx={{
        flexGrow: 1,
        mt: "7px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h5" color="#00807b" textAlign="center" mb="20px">
        Manage your projects here
      </Typography>
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
