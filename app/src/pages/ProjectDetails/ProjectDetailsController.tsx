import * as React from "react";

import { useParams } from "react-router-dom";

import * as apiClient from "../../services/apiClients/usePublicApi";
import { Project, ProjectFunding } from "../../utils/types";

import ProjectDetailsView from "./ProjectDetailsView";

const ProjectDetailsController = () => {
  const [project, setProject] = React.useState<Project>();
  const [projectFundings, setProjectFundings] = React.useState<
    ProjectFunding[]
  >([]);
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const { projectId } = useParams<string>();

  const loadProject = React.useCallback(() => {
    if (projectId !== undefined) {
      apiClient
        .getProject(projectId)
        .then((response) => {
          setProject(response);
          setError(false);
        })
        .catch((err) => {
          setError(true);
          setErrorMessage(err.message);
        });
    }
  }, [projectId]);

  const loadProjectFundings = React.useCallback(() => {
    if (projectId !== undefined) {
      apiClient
        .getProjectFundings(projectId)
        .then((response) => {
          setProjectFundings(response);
          setError(false);
        })
        .catch((err) => {
          setError(true);
          setErrorMessage(err.message);
        });
    }
  }, [projectId]);

  React.useEffect(() => {
    loadProject();
    loadProjectFundings();
  }, [loadProject, loadProjectFundings]);

  return (
    <ProjectDetailsView
      project={project}
      projectFundings={projectFundings}
      error={error}
      errorMessage={errorMessage}
    />
  );
};

export default ProjectDetailsController;
