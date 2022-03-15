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

export const addProject = (title: string) =>
  db.one("INSERT INTO projects(title) VALUES($<title>) RETURNING *", { title });

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
