import * as dotenv from "dotenv";
import * as pgPromise from "pg-promise";
import {
  IConnectionParameters,
  IClient,
} from "pg-promise/typescript/pg-subset";

const pgp = pgPromise();
const db = initDb();

export const getProjects = () => db.any("SELECT * FROM projects");

export const getProject = (projectId: string) =>
  db.one("SELECT * FROM projects WHERE project_id=$<projectId>", {
    projectId,
  });

export const getProjectFundings = (projectId: string) =>
  db.any(
    "SELECT * FROM fundings WHERE project_id=$<projectId> ORDER BY created_at DESC",
    {
      projectId,
    },
  );

export const getCreatorProjects = (creatorId: string) =>
  db.any("SELECT * FROM projects WHERE creator_id=$<creatorId>", {
    creatorId,
  });

export const addProject = ({
  title,
  description,
  label,
  imageUrl,
  creator,
  fundingGoal,
}) =>
  db.one(
    "INSERT INTO projects(title, description, label, image_url, creator, funding_goal) VALUES($<title>, $<description>, $<label>, $<imageUrl>, $<creator>, $<fundingGoal>) RETURNING *",
    { title, description, label, imageUrl, creator, fundingGoal },
  );

export const addProjectFunding = ({ projectId, contributor, amount }) => {
  db.one(
    "INSERT INTO fundings(project_id, contributor, amount) VALUES($<projectId>, $<contributor>, $<amount>) RETURNING *",
    { projectId, contributor, amount },
  );
  db.one(
    "UPDATE projects SET total_fundings=(total_fundings + $<amount>) WHERE project_id=$<projectId> RETURNING *",
    { projectId, amount },
  );
};

export const updateProject = (projectId: string, project: any) =>
  db.one(
    `UPDATE projects SET title=$<title>, description=$<description>, label=$<label>, image_url=$<imageUrl>, creator=$<creator>, funding_goal=$<fundingGoal>
    WHERE project_id=$<projectId>
    RETURNING *`,
    { projectId, ...project },
  );

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
