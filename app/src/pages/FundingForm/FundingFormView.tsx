import {
  Typography,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { CardElement } from "@stripe/react-stripe-js";
import { Controller } from "react-hook-form";

import { FundingFormViewProps } from "../../utils/types";

const FundingFormView = ({
  handleFormSubmit,
  formSubmitted,
  control,
  handleSubmit,
  error,
  handleChange,
  succeeded,
  disabled,
  processing,
}: FundingFormViewProps) => {
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
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
      {formSubmitted && !error && <CircularProgress />}
      <Typography variant="h5">Funding Form</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
        </Box>
        <Box mt="10px" mb="10px">
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
        </Box>
        <Button
          variant="contained"
          type="submit"
          disabled={processing || disabled || succeeded}
        >
          {processing ? "Processing" : "Fund the Project"}
        </Button>
        {error && <Typography>{error}</Typography>}
        {succeeded && (
          <Typography>Your funding went through! Please wait</Typography>
        )}
      </Box>
    </Box>
  );
};

export default FundingFormView;
