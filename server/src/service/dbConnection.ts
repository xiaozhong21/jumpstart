import * as dotenv from "dotenv";
import * as pgPromise from "pg-promise";
// import pgPromise from "pg-promise";

import {
  IConnectionParameters,
  IClient,
} from "pg-promise/typescript/pg-subset";

import { Creator, ProjectFormInput, FundingDetails } from "../utils/types";

const pgp = pgPromise();
export const db = initDb();

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
