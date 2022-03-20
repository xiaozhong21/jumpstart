import * as React from "react";

import * as apiClient from "../../services/apiClients/usePublicApi";
import { Project } from "../../utils/types";
import ProjectListView from "../ProjectList/ProjectListView";

const ProjectListController = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [selectedProjects, setSelectedProjects] = React.useState<Project[]>([]);
  const [value, setValue] = React.useState(0);
  const labels = [
    "",
    "Arts",
    "Food and Craft",
    "Tech and Design",
    "Games",
    "Music",
  ];

  const loadProjects = async () => setProjects(await apiClient.getProjects());

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    setSelectedProjects(
      newValue === 0
        ? projects
        : projects.filter((project) => project.label === labels[newValue]),
    );
  };

  React.useEffect(() => {
    loadProjects();
  }, []);

  return (
    <ProjectListView
      projects={projects}
      selectedProjects={selectedProjects}
      value={value}
      handleChange={handleChange}
    />
  );
};

export default ProjectListController;
