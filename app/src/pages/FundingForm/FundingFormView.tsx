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
  register,
  watch,
  formState: { errors },
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
      aria-label="Funding form to contribute to initial funding to your selected project via credit card"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        maxWidth: "600px",
        margin: "0 auto",
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
          <FormHelperText id="name-field-helper-text">
            You can also choose to remain anonymous!
          </FormHelperText>
          <Controller
            name="contributor"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                {...register("contributor")}
                aria-describedby="component-helper-text"
              />
            )}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel htmlFor="amount">
            Your Funding Amount ($) <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <FormHelperText id="amount-field-helper-text">
            Please enter an amount greater than or equal to 1
          </FormHelperText>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                {...register("amount")}
                type="number"
                placeholder="100"
                required
              />
            )}
            rules={{ min: 1 }}
          />
          {errors.amount && (
            <Typography variant="subtitle2" sx={{ color: "red" }}>
              Please enter an amount greater than or equal to 1
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <InputLabel htmlFor="card-element">
            Credit Card Info <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <FormHelperText id="card-helper-text">
            This is a simulated transaction to test Stripe integration. Please
            use card number 4242 4242 4242 4242, any future date for expiration,
            and any 3 digits for CVC,.
          </FormHelperText>
          <Box mt="10px" mb="10px" sx={{ borderBottom: "grey solid 1px" }}>
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
          </Box>
          {error && (
            <Typography variant="subtitle2" sx={{ color: "red" }}>
              {error}
            </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          type="submit"
          disabled={processing || disabled || succeeded}
        >
          {processing ? "Processing" : "Fund the Project"}
        </Button>

        {succeeded && (
          <Typography>Your funding went through! Please wait</Typography>
        )}
      </Box>
    </Box>
  );
};

export default FundingFormView;
