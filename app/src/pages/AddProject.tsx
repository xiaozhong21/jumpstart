import * as React from "react";

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
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import * as apiClient from "../services/apiClient";
import { ProjectFormInput } from "../utils/types";

const AddProject = () => {
  const { control, handleSubmit } = useForm<ProjectFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ProjectFormInput> = async (data) => {
    apiClient.addProject(data);
    console.log(data);
    // navigate("/projects");
  };

  return (
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
              <Input {...field} aria-describedby="title-helper-text" required />
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
              <Input {...field} aria-describedby="description-helper-text" />
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
              <Select variant="standard" {...field}>
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
              <Input {...field} aria-describedby="imageUrl-helper-text" />
            )}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel htmlFor="creator">Your Name</InputLabel>
          <Controller
            name="creator"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} />}
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
              <Input {...field} type="number" placeholder="100" required />
            )}
          />
        </Box>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddProject;
