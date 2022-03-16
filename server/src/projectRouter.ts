import { Request, Response } from "express";
var express = require("express");

import * as db from "./db";

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

projectRouter.post("/", async (req: Request, res: Response) => {
  const project = await db.addProject(req.body);
  res.status(201).json(project);
});

projectRouter.post("/:projectId", async (req: Request, res: Response) => {
  const updatedProject = await db.updateProject(req.params.projectId, req.body);
  res.status(201).json(updatedProject);
});

projectRouter.post(
  "/:projectId/fundings",
  async (req: Request, res: Response) => {
    const projectFunding = await db.addProjectFunding(req.body);
    res.status(201).json(projectFunding);
  },
);

export default projectRouter;
