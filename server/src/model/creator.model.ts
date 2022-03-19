import { Creator, ProjectFormInput } from "../utils/types";
import { db } from "../service/dbConnection";

export const getCreatorProjects = (sub: string) =>
  db.any(
    `SELECT projects.* FROM projects LEFT JOIN creators on projects.creator_id=creators.creator_id
    WHERE sub=$<sub>`,
    { sub },
  );

export const addOrUpdateUser = (user: Creator) =>
  db.one(
    `INSERT INTO creators(given_name, family_name, picture, email, sub)
      VALUES($<given_name>, $<family_name>, $<picture>, $<email>, $<sub>)
      ON CONFLICT (sub) DO
        UPDATE SET given_name = $<given_name>, family_name = $<family_name>,
          picture = $<picture>, email=$<email>
      RETURNING *`,
    user,
  );

export const addCreatorProject = (sub: string, project: ProjectFormInput) =>
  db.one(
    `INSERT INTO projects(creator_id, title, description, label, image_url, funding_goal)
    VALUES((SELECT creator_id FROM creators WHERE sub=$<sub>), $<title>, $<description>, $<label>, $<imageUrl>, $<fundingGoal>)
    RETURNING *`,
    { sub, ...project },
  );

export const updateCreatorProject = (projectId: string, project: any) =>
  db.one(
    `UPDATE projects SET title=$<title>, description=$<description>, label=$<label>, image_url=$<imageUrl>, funding_goal=$<fundingGoal>
    WHERE project_id=$<projectId>
    RETURNING *`,
    { projectId, ...project },
  );

export const deleteCreatorProject = (projectId: string) =>
  db.none("DELETE FROM projects WHERE project_id=$<projectId>", {
    projectId,
  });
