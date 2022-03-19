import * as React from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import * as apiClient from "../../services/apiClients/usePublicApi";
import { FundingFormInput, FundingDetails } from "../../utils/types";

import FundingFormView from "./FundingFormView";

const FundingFormController = () => {
  const { projectId } = useParams<string>();
  const { watch, register, control, handleSubmit } =
    useForm<FundingFormInput>();
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const [succeeded, setSucceeded] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState<boolean>();
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const stripe = useStripe();
  const elements = useElements();

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
    const paymentIntent = await fetch("/api/payment", {
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
    <FundingFormView
      handleFormSubmit={handleFormSubmit}
      formSubmitted={formSubmitted}
      error={error}
      handleChange={handleChange}
      succeeded={succeeded}
      disabled={disabled}
      processing={processing}
      control={control}
      handleSubmit={handleSubmit}
      register={register}
      watch={watch}
    />
  );
};

export default FundingFormController;
