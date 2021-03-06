import { Request, Response } from "express";
var express = require("express");

import mime from "mime-types";

import jwtCheck from "./service/jwtCheck";
import paymentRouter from "./controller/paymentRouter";
import projectRouter from "./controller/projectRouter";
import creatorRouter from "./controller/creatorRouter";

const app = express();

app.use("/api/projects", projectRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/creators", jwtCheck, creatorRouter);

// Heartbeat URL endpoint
app.get("/api/ping", (req: Request, res: Response) =>
  res.json({ response: "pong" }),
);

if (process.env?.SERVE_REACT?.toLowerCase() === "true") {
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res: Response, path: any) =>
        ["application/json", "text/html"].includes(
          mime.lookup(path).toString(),
        ) && res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

  app.get("*", (req: Request, res: Response) => {
    res.sendFile("/app/index.html");
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.info(`Jumpstart server listening at http://localhost:${port}`);
});
