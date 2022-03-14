import * as React from "react";

import { useParams } from "react-router-dom";

import * as apiClient from "../services/apiClient";
import { Project } from "../utils/types";

const ProjectDetails = () => {
  const [project, setProject] = React.useState<Project>();
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

  React.useEffect(() => {
    loadProject();
  }, [loadProject]);

  return error === true ? (
    <p>{errorMessage}</p>
  ) : (
    <div>{project && project.title}</div>
  );
};

export default ProjectDetails;
