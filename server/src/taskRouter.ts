import { Request, Response } from "express";
var express = require("express");

import * as db from "./db";

const taskRouter = express.Router();

taskRouter.get("/", async (req: Request, res: Response) => {
  const tasks = await db.getTasks();
  res.json(tasks);
});

taskRouter.use(express.json());
taskRouter.post("/", async (req: Request, res: Response) => {
  const task = await db.addTask(req.body.name);
  res.status(201).json(task);
});

export default taskRouter;
