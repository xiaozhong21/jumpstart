import * as React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

import { ProjectCardProps } from "../utils/types";

const ProjectCard = ({
  title,
  description,
  label,
  imageUrl,
  fundingGoal,
  totalFundings,
}: ProjectCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, height: 400 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageUrl} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;
