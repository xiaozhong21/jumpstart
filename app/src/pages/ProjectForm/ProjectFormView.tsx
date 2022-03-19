import {
  Typography,
  InputLabel,
  Input,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Button,
} from "@mui/material";
import { Controller } from "react-hook-form";

import { ProjectFormViewProps } from "../../utils/types";

const ProjectFormView = ({
  isAddMode,
  error,
  errorMessage,
  project,
  handleSubmit,
  onSubmit,
  register,
  control,
}: ProjectFormViewProps) => {
  const formContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Typography variant="h5">JumpStart Your Project</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel htmlFor="title">
            Project Title <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <FormHelperText id="title-helper-text">
            Name your project to impress your funders!
          </FormHelperText>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                {...register("title")}
                aria-describedby="title-helper-text"
                required
              />
            )}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel htmlFor="description">Project Description</InputLabel>
          <FormHelperText id="description-helper-text">
            Briefly state your mission statement!
          </FormHelperText>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                {...register("description")}
                aria-describedby="description-helper-text"
              />
            )}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel htmlFor="label">Choose A Category</InputLabel>
          <Controller
            name="label"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select variant="standard" {...field} {...register("label")}>
                <MenuItem value="art">Art</MenuItem>
                <MenuItem value="tech">Technology</MenuItem>
              </Select>
            )}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel htmlFor="imageUrl">Project Image</InputLabel>
          <FormHelperText id="description-helper-text">
            Upload an image that represents your project
          </FormHelperText>
          <Controller
            name="imageUrl"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                {...register("imageUrl")}
                aria-describedby="imageUrl-helper-text"
              />
            )}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel htmlFor="fundingGoal">
            Your Funding Goal ($) <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Controller
            name="fundingGoal"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                {...register("fundingGoal")}
                type="number"
                placeholder="100"
                required
              />
            )}
          />
        </Box>

        <Button variant="contained" type="submit">
          {isAddMode ? "Submit" : "Edit"}
        </Button>
      </Box>
    </Box>
  );

  return isAddMode ? (
    formContent
  ) : error ? (
    <Typography>{errorMessage}</Typography>
  ) : !project ? (
    <Typography>Loading...</Typography>
  ) : (
    formContent
  );
};

export default ProjectFormView;
