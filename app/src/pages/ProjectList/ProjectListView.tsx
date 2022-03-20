import { Box, Grid } from "@mui/material";

import ProjectCard from "../../components/ProjectCard";
import TopTabs from "../../components/TopTabs";
import { ProjectListViewProps, Project } from "../../utils/types";

const ProjectListView = ({
  projects,
  selectedProjects,
  value,
  handleChange,
}: ProjectListViewProps) => (
  <Box sx={{ flexGrow: 1 }}>
    <TopTabs value={value} handleChange={handleChange} />
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      mt="20px"
    >
      {value === 0
        ? projects.map((project: Project) => (
            <Grid item xs={12} sm={4} md={4} key={project.project_id}>
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
          ))
        : selectedProjects.map((project: Project) => (
            <Grid item xs={12} sm={4} md={4} key={project.project_id}>
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

export default ProjectListView;
