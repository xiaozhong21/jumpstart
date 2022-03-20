import LabelIcon from "@mui/icons-material/Label";
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
import { convertNumToThousandths } from "../utils/helpers";
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
    apiClient && (await apiClient.deleteCreatorProject(projectId));
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
                mt: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <LabelIcon sx={{ color: "#00807b" }} />
                <Typography sx={{ color: "#00807b", fontSize: "small" }}>
                  {label}
                </Typography>
              </Box>

              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  height: "50px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                {title}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  height: "60px",
                  width: "90%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  margin: 0,
                  textAlign: "justify",
                  fontWeight: "400",
                }}
              >
                {description}
              </Typography>

              <ProgressBar
                fundingGoal={fundingGoal}
                totalFundings={totalFundings}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ fontSize: "x-large", fontWeight: "900" }}
                >
                  ${convertNumToThousandths(totalFundings)}
                </Typography>
                <Typography>
                  <span style={{ fontSize: "small", color: "grey" }}>
                    raised of ${convertNumToThousandths(fundingGoal)} goal
                  </span>
                </Typography>
              </Box>
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
