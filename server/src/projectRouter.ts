import { Request, Response } from "express";
var express = require("express");

import * as db from "./db";

const projectRouter = express.Router();
projectRouter.use(express.json());

projectRouter.get("/", async (req: Request, res: Response) => {
  const projects = await db.getProjects();
  res.json(projects);
});

projectRouter.post("/", async (req: Request, res: Response) => {
  const project = await db.addProject(req.body.title);
  res.status(201).json(project);
});

export default projectRouter;
