import * as React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

import { ProjectCardProps } from "../utils/types";

import ProgressBar from "./ProgressBar";

const ProjectCard = ({
  title,
  description,
  label,
  imageUrl,
  fundingGoal,
  totalFundings,
}: ProjectCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageUrl} alt={title} />
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
    </Card>
  );
};

export default ProjectCard;
