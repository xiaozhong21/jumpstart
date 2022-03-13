import * as React from "react";

import * as apiClient from "./apiClient";
import { Project } from "./types";

const Projects = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);

  const loadProjects = async () => setProjects(await apiClient.getProjects());

  React.useEffect(() => {
    loadProjects();
  }, []);

  return (
    <ul>
      {projects.map((project: Project) => (
        <li key={project.id}>{project.title}</li>
      ))}
    </ul>
  );
};

export default Projects;
