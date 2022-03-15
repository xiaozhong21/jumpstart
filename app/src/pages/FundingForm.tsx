import * as React from "react";

import {
  Typography,
  InputLabel,
  Input,
  OutlinedInput,
  FormHelperText,
  Box,
  Button,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";

import { FundingFormInput } from "../utils/types";

const FundingForm = () => {
  const { projectId } = useParams<string>();
  const { control, handleSubmit } = useForm<FundingFormInput>();

  const onSubmit: SubmitHandler<FundingFormInput> = (data) => {
    console.log(data);
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
      <Typography variant="h5">Funding Form for Project {projectId}</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <InputLabel htmlFor="contributor">Your Name</InputLabel>
        <FormHelperText id="component-helper-text">
          You can also choose to remain anonymous!
        </FormHelperText>
        <Controller
          name="contributor"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} aria-describedby="component-helper-text" />
          )}
        />
        <InputLabel htmlFor="amount">
          Your Funding Amount ($) <span style={{ color: "red" }}>*</span>
        </InputLabel>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input {...field} type="number" placeholder="100" required />
          )}
        />
        <Button variant="contained" type="submit">
          Fund the Project
        </Button>
      </Box>
    </Box>
  );
};

export default FundingForm;
