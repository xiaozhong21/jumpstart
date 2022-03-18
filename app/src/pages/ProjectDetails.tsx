import * as React from "react";

import LoyaltyTwoToneIcon from "@mui/icons-material/LoyaltyTwoTone";
import {
  Grid,
  Typography,
  CardMedia,
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";

import FundingHistoryModal from "../components/FundingHistoryModal";
import ProgressBar from "../components/ProgressBar";
import * as apiClient from "../services/apiClients/usePublicApi";
import { convertNumToThousandths, timestampFormatter } from "../utils/helpers";
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
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">{project.title}</Typography>
      </Box>
      <Grid container spacing={4} mt={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={project.image_url}
              alt={project.title}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "space-between",
              gap: "20px",
            }}
          >
            {project.creator ? (
              <Typography variant="body2">
                Created by {project.creator}
              </Typography>
            ) : null}
            <ProgressBar
              fundingGoal={project.funding_goal}
              totalFundings={project.total_fundings}
            />
            <Typography variant="body1" component="div">
              <span style={{ fontSize: "x-large", fontWeight: "20px" }}>
                ${convertNumToThousandths(project.total_fundings)}
              </span>{" "}
              raised of ${convertNumToThousandths(project.funding_goal)}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
              <Link to={`/projects/${project.project_id}/fund`}>
                <Button variant="contained">Fund the Project</Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="body2" component="div">
              {project.description}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "space-between",
            }}
          >
            <List>
              {projectFundings &&
                projectFundings
                  .slice(0, 3)
                  .map(({ funding_id, contributor, amount, created_at }) => (
                    <>
                      <Divider />
                      <ListItem key={funding_id}>
                        <ListItemAvatar>
                          <Avatar>
                            <LoyaltyTwoToneIcon sx={{ color: "white" }} />
                          </Avatar>
                        </ListItemAvatar>
                        {contributor ? (
                          <ListItemText
                            primary={`$${convertNumToThousandths(
                              amount,
                            )} from ${contributor}`}
                            secondary={timestampFormatter(created_at)}
                          />
                        ) : (
                          <ListItemText
                            primary={`$${convertNumToThousandths(amount)}`}
                            secondary={timestampFormatter(created_at)}
                          />
                        )}
                      </ListItem>
                    </>
                  ))}
            </List>
            <FundingHistoryModal projectFundings={projectFundings} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectDetails;
