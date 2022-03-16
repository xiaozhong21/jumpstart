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
import { useNavigate, useParams } from "react-router-dom";

import * as apiClient from "../services/apiClient";
import { ProjectFormInput, Project } from "../utils/types";

const AddProject = () => {
  const { formContent, isAddMode, error, errorMessage, loadProject } =
    useMyForm();

  React.useEffect(() => {
    loadProject();
  }, [loadProject]);

  return isAddMode ? (
    formContent
  ) : error ? (
    <Typography>{errorMessage}</Typography>
  ) : (
    formContent
  );
};

const useMyForm = () => {
  const { register, control, handleSubmit, setValue } =
    useForm<ProjectFormInput>();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const isAddMode = !projectId;

  const autopopulate = (project: Project) => {
    if (!isAddMode) {
      setValue("title", project.title);
      setValue("description", project.description);
      setValue("label", project.label);
      setValue("imageUrl", project.image_url);
      setValue("creator", project.creator);
      setValue("fundingGoal", project.funding_goal);
    }
  };

  const clearForm = () => {
    setValue("title", "");
    setValue("description", "");
    setValue("label", "");
    setValue("imageUrl", "");
    setValue("creator", "");
    setValue("fundingGoal", 0);
  };

  const loadProject = React.useCallback(() => {
    if (projectId !== undefined) {
      apiClient
        .getProject(projectId)
        .then((response) => {
          autopopulate(response);
          setError(false);
        })
        .catch((err) => {
          setError(true);
          setErrorMessage(err.message);
        });
    } else {
      clearForm();
    }
  }, [projectId, autopopulate, clearForm]);

  const onSubmit: SubmitHandler<ProjectFormInput> = async (data) => {
    if (isAddMode) {
      await apiClient.addProject(data);
    } else {
      await apiClient.updateProject(projectId, data);
    }
    navigate("/dashboard");
  };

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
          <InputLabel htmlFor="creator">Your Name</InputLabel>
          <Controller
            name="creator"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input {...field} {...register("creator")} />
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

  return { formContent, isAddMode, error, errorMessage, loadProject };
};

export default AddProject;
