import { Request, Response } from "express";
import * as dotenv from "dotenv";

var express = require("express");
dotenv.config({ path: "../.env" });
const stripe = require("stripe")(process.env.STRIPE_API_SECRET_KEY);

const paymentRouter = express.Router();
paymentRouter.use(express.json());

paymentRouter.post("/", async (req: Request, res: Response) => {
  const fundingDetails = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(fundingDetails.amount) * 100,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

export default paymentRouter;
