import * as React from "react";

import { Typography, CardMedia, Box, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import ProgressBar from "../components/ProgressBar";
import * as apiClient from "../services/apiClient";
import { Project, ProjectFunding } from "../utils/types";

const ProjectDetails = () => {
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

  return error === true ? (
    <p>{errorMessage}</p>
  ) : !project ? (
    <p>Loading...</p>
  ) : (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "20px",
            width: "60%",
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={project.image_url}
            alt={project.title}
          />
          <Typography variant="body2" component="div">
            {project.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "30%",
            gap: "20px",
          }}
        >
          <Typography variant="h5">{project.title}</Typography>
          <Typography>Created by {project.creator}</Typography>
          <ProgressBar
            fundingGoal={project.funding_goal}
            totalFundings={project.total_fundings}
          />
          <Typography variant="body2" component="div">
            ${project.total_fundings} raised of ${project.funding_goal}
          </Typography>
          <Link to={`/projects/${project.project_id}/fund`}>
            <Button variant="contained">Fund It</Button>
          </Link>
          {projectFundings.length !== 0 ? (
            <Typography>Fundings History</Typography>
          ) : null}
          {projectFundings &&
            projectFundings.map(
              ({ funding_id, contributor, amount, created_at }) => (
                <Typography key={funding_id}>
                  ${amount} from {contributor} at {created_at}
                </Typography>
              ),
            )}
        </Box>
      </Box>
    </div>
  );
};

export default ProjectDetails;
