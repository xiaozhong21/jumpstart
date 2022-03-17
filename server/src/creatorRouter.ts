import { Request, Response } from "express";
var express = require("express");

import * as db from "./db";

const creatorRouter = express.Router();
creatorRouter.use(express.json());

creatorRouter.post("/", async (req: Request, res: Response) => {
  const user = await db.addOrUpdateUser(req.body.user);
  res.status(201).json(user);
});

creatorRouter.get(
  "/:creatorId/projects",
  async (req: Request, res: Response) => {
    try {
      const creatorProjects = await db.getCreatorProjects(req.params.creatorId);
      res.json(creatorProjects);
    } catch (err: any) {
      console.error(err);
    }
  },
);

export default creatorRouter;
