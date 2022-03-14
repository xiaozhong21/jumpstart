import { Box, LinearProgress } from "@mui/material";

import { ProgressBarProps } from "../utils/types";

const ProgressBar = ({ fundingGoal, totalFundings }: ProgressBarProps) => {
  const progress: number = (totalFundings / fundingGoal) * 100;

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

export default ProgressBar;
