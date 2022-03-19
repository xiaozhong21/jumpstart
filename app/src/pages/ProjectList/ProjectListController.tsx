import * as React from "react";

import * as apiClient from "../../services/apiClients/usePublicApi";
import { Project } from "../../utils/types";
import ProjectListView from "../ProjectList/ProjectListView";

const ProjectListController = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);

  const loadProjects = async () => setProjects(await apiClient.getProjects());

  React.useEffect(() => {
    loadProjects();
  }, []);

  return <ProjectListView projects={projects} />;
};

export default ProjectListController;
