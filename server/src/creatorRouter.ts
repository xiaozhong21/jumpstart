import { Request, Response } from "express";
var express = require("express");

import * as db from "./model/db";
import { ProjectFormInput } from "./utils/types";

const creatorRouter = express.Router();
creatorRouter.use(express.json());

creatorRouter.post("/", async (req: Request, res: Response) => {
  const user = await db.addOrUpdateUser(req.body.user);
  res.status(201).json(user);
});

creatorRouter.get(
  "/projects",
  async (
    req: { user: { sub: string } },
    res: { json: (arg0: any[]) => void },
  ) => {
    try {
      const creatorProjects = await db.getCreatorProjects(req.user.sub);
      res.json(creatorProjects);
    } catch (err: any) {
      console.error(err);
    }
  },
);

creatorRouter.post(
  "/projects",
  async (
    req: { user: { sub: string }; body: ProjectFormInput },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: any): void; new (): any };
      };
    },
  ) => {
    console.log(req.user);
    const project = await db.addCreatorProject(req.user.sub, req.body);
    res.status(201).json(project);
  },
);

creatorRouter.post(
  "/projects/:projectId",
  async (req: Request, res: Response) => {
    const updatedProject = await db.updateCreatorProject(
      req.params.projectId,
      req.body,
    );
    res.status(201).json(updatedProject);
  },
);

creatorRouter.delete(
  "/projects/:projectId",
  async (req: Request, res: Response) => {
    try {
      await db.deleteCreatorProject(req.params.projectId);
      res.status(204).end();
    } catch (err: any) {
      console.error(err);
    }
  },
);

export default creatorRouter;
