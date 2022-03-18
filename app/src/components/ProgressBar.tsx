import { Box, LinearProgress, Typography } from "@mui/material";

import { ProgressBarProps } from "../utils/types";

const ProgressBar = ({ fundingGoal, totalFundings }: ProgressBarProps) => {
  const progress: number = (totalFundings / fundingGoal) * 100;

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box sx={{ width: "100%", mr: 1, height: 20, display: "table" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            borderRadius: 5,
            display: "table-cell",
            verticalAlign: "middle",
          }}
        />
      </Box>
      <Box sx={{ minWidth: 5 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
