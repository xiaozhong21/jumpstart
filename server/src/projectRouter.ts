import { Request, Response } from "express";
var express = require("express");

import * as db from "./model/db";

const projectRouter = express.Router();
projectRouter.use(express.json());

projectRouter.get("/", async (req: Request, res: Response) => {
  const projects = await db.getProjects();
  res.json(projects);
});

projectRouter.get("/:projectId", async (req: Request, res: Response) => {
  try {
    const project = await db.getProject(req.params.projectId);
    res.json(project);
  } catch (err: any) {
    console.error(err);
  }
});

projectRouter.get(
  "/:projectId/fundings",
  async (req: Request, res: Response) => {
    try {
      const projectFundings = await db.getProjectFundings(req.params.projectId);
      res.json(projectFundings);
    } catch (err: any) {
      console.error(err);
    }
  },
);

projectRouter.post(
  "/:projectId/fundings",
  async (req: Request, res: Response) => {
    const projectFunding = await db.addProjectFunding(req.body);
    res.status(201).json(projectFunding);
  },
);

export default projectRouter;
