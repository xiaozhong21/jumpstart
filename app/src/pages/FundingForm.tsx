import * as React from "react";

import {
  Typography,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import * as apiClient from "../services/apiClient";
import { FundingFormInput, FundingDetails } from "../utils/types";

const FundingForm = () => {
  const { projectId } = useParams<string>();
  const { control, handleSubmit } = useForm<FundingFormInput>();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const [succeeded, setSucceeded] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState<boolean>();
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const stripe = useStripe();
  const elements = useElements();

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

  const handleFormSubmit: SubmitHandler<FundingFormInput> = async (data) => {
    let fundingDetails = {
      projectId: Number(projectId),
      ...data,
    };
    setProcessing(true);
    setFormSubmitted(true);
    processPayment(fundingDetails);
  };

  const processPayment = async (fundingDetails: FundingDetails) => {
    const paymentIntent = await createPaymentIntent(fundingDetails);
    await confirmCardPayment(fundingDetails, paymentIntent.clientSecret);
  };

  const createPaymentIntent = async (fundingDetails: FundingDetails) => {
    const paymentIntent = await fetch("/api/funding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fundingDetails),
    }).then((res) => {
      return res.json();
    });

    return paymentIntent;
  };

  const confirmCardPayment = async (
    fundingDetails: FundingDetails,
    clientSecret: string,
  ) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    let payload;
    if (card !== null) {
      payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
        },
      });
    }

    if (payload !== undefined) {
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        await apiClient
          .addProjectFunding(fundingDetails)
          .then(() => navigate(`/projects/${projectId}`));
      }
    }
  };

  const handleChange = async (event: any) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setFormSubmitted(false);
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
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
      <Typography variant="h5">Funding Form for Project {projectId}</Typography>
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

export default FundingForm;
