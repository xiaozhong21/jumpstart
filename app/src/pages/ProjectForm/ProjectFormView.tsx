import {
  Typography,
  InputLabel,
  Input,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Button,
  TextareaAutosize,
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
  formState: { errors },
}: ProjectFormViewProps) => {
  const formContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" color="#00807b">
        JumpStart Your Project
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          mt: "20px",
        }}
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
            render={({ field }) => (
              <Input
                {...field}
                {...register("title")}
                aria-describedby="Name your project to impress your funders"
                required
              />
            )}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel htmlFor="description">Project Description</InputLabel>
          <FormHelperText id="description-helper-text">
            Briefly state your mission statement! This is your chance to
            convince potential investors
          </FormHelperText>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextareaAutosize
                minRows={3}
                {...field}
                {...register("description")}
                aria-describedby="Briefly state your mission statement"
              />
            )}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel htmlFor="label">Choose A Category</InputLabel>
          <Controller
            name="label"
            control={control}
            render={({ field }) => (
              <Select variant="standard" {...field} {...register("label")}>
                <MenuItem value="Arts">Arts</MenuItem>
                <MenuItem value="Food and Craft">Food and Craft</MenuItem>
                <MenuItem value="Tech and Design">Tech and Design</MenuItem>
                <MenuItem value="Games">Games</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
              </Select>
            )}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel htmlFor="imageUrl">Project Image</InputLabel>
          <FormHelperText id="description-helper-text">
            Consider including a link to an image that can best represent your
            project
          </FormHelperText>
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                {...register("imageUrl")}
                aria-describedby="Include a link to an image represents your project"
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
            rules={{ min: 0 }}
          />
          {errors.fundingGoal && (
            <Typography variant="subtitle2" sx={{ color: "red" }}>
              Please enter a positive amount
            </Typography>
          )}
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
