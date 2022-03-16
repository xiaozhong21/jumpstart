import { Request, Response } from "express";
var express = require("express");

import * as db from "./db";

const creatorRouter = express.Router();
creatorRouter.use(express.json());

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
