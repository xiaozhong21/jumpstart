import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

import useProtectedApi from "../services/apiClients/useProtectedApi";
import { ProjectCardProps } from "../utils/types";

import ProgressBar from "./ProgressBar";

const ProjectCard = ({
  projectId,
  title,
  description,
  label,
  imageUrl,
  fundingGoal,
  totalFundings,
  isAuthenticated,
  loadCreatorProjects,
}: ProjectCardProps) => {
  const { apiClient } = useProtectedApi();

  const handleDelete = async () => {
    await apiClient.deleteCreatorProject(projectId);
    loadCreatorProjects && loadCreatorProjects();
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/projects/${projectId}`}>
          <CardActionArea aria-label="clickable project card showing project image, description, and funding status">
            <CardMedia
              component="img"
              height="140"
              image={imageUrl}
              alt={title}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  height: "30px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  height: "65px",
                  width: "90%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {description}
              </Typography>
              <ProgressBar {...{ fundingGoal, totalFundings }} />
              <Typography variant="body2" component="div">
                ${totalFundings} raised of ${fundingGoal}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        {isAuthenticated ? (
          <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Link to={`/projects/${projectId}/edit`}>
              <Button aria-label="edit current project">Edit</Button>
            </Link>
            <Button onClick={handleDelete} aria-label="delete current project">
              Delete
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </Box>
  );
};

export default ProjectCard;
