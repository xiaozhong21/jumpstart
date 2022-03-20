import { Request, Response } from "express";
var express = require("express");

import * as project from "../model/project.model";
import * as funding from "../model/funding.model";

const projectRouter = express.Router();
projectRouter.use(express.json());

projectRouter.get("/", async (req: Request, res: Response) => {
  const projects = await project.getProjects();
  res.json(projects);
});

projectRouter.get("/:projectId", async (req: Request, res: Response) => {
  try {
    const returnedProject = await project.getProject(req.params.projectId);
    res.json(returnedProject);
  } catch (err: any) {
    console.error(err);
  }
});

projectRouter.get(
  "/:projectId/fundings",
  async (req: Request, res: Response) => {
    try {
      const projectFundings = await funding.getProjectFundings(
        req.params.projectId,
      );
      res.json(projectFundings);
    } catch (err: any) {
      console.error(err);
    }
  },
);

projectRouter.post(
  "/:projectId/fundings",
  async (req: Request, res: Response) => {
    const projectFunding = await funding.addProjectFunding(req.body);
    res.status(201).json(projectFunding);
  },
);

export default projectRouter;
