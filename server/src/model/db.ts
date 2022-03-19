import * as dotenv from "dotenv";
import * as pgPromise from "pg-promise";
// import pgPromise from "pg-promise";

import {
  IConnectionParameters,
  IClient,
} from "pg-promise/typescript/pg-subset";

import { Creator, ProjectFormInput, FundingDetails } from "../utils/types";

const pgp = pgPromise();
const db = initDb();

// export const getProjects = () => db.any("SELECT * FROM projects");

// export const getProject = (projectId: string) =>
//   db.one("SELECT * FROM projects WHERE project_id=$<projectId>", {
//     projectId,
//   });

// export const getProjectFundings = (projectId: string) =>
//   db.any(
//     "SELECT * FROM fundings WHERE project_id=$<projectId> ORDER BY created_at DESC",
//     {
//       projectId,
//     },
//   );

// export const getCreatorProjects = (sub: string) =>
//   db.any(
//     `SELECT projects.* FROM projects LEFT JOIN creators on projects.creator_id=creators.creator_id
//     WHERE sub=$<sub>`,
//     { sub },
//   );

// export const addOrUpdateUser = (user: Creator) =>
//   db.one(
//     `INSERT INTO creators(given_name, family_name, picture, email, sub)
//       VALUES($<given_name>, $<family_name>, $<picture>, $<email>, $<sub>)
//       ON CONFLICT (sub) DO
//         UPDATE SET given_name = $<given_name>, family_name = $<family_name>,
//           picture = $<picture>, email=$<email>
//       RETURNING *`,
//     user,
//   );

// export const addCreatorProject = (sub: string, project: ProjectFormInput) =>
//   db.one(
//     `INSERT INTO projects(creator_id, title, description, label, image_url, funding_goal)
//     VALUES((SELECT creator_id FROM creators WHERE sub=$<sub>), $<title>, $<description>, $<label>, $<imageUrl>, $<fundingGoal>)
//     RETURNING *`,
//     { sub, ...project },
//   );

// export const addProjectFunding = ({
//   projectId,
//   contributor,
//   amount,
// }: FundingDetails) => {
//   db.one(
//     "INSERT INTO fundings(project_id, contributor, amount) VALUES($<projectId>, $<contributor>, $<amount>) RETURNING *",
//     { projectId, contributor, amount },
//   );
//   db.one(
//     "UPDATE projects SET total_fundings=(total_fundings + $<amount>) WHERE project_id=$<projectId> RETURNING *",
//     { projectId, amount },
//   );
// };

// export const updateCreatorProject = (projectId: string, project: any) =>
//   db.one(
//     `UPDATE projects SET title=$<title>, description=$<description>, label=$<label>, image_url=$<imageUrl>, funding_goal=$<fundingGoal>
//     WHERE project_id=$<projectId>
//     RETURNING *`,
//     { projectId, ...project },
//   );

// export const deleteCreatorProject = (projectId: string) =>
//   db.none("DELETE FROM projects WHERE project_id=$<projectId>", {
//     projectId,
//   });

function initDb() {
  let connection: string | IConnectionParameters<IClient>;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp(connection);
}
