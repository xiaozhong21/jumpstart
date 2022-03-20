import { FundingDetails } from "../utils/types";
import { db } from "../service/dbConnection";

export const getProjects = () => db.any("SELECT * FROM projects");

export const getProject = (projectId: string) =>
  db.one("SELECT * FROM projects WHERE project_id=$<projectId>", {
    projectId,
  });
