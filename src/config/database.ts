import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { Database } from "../types/schema";
import { dbConnection } from "../common/constants.js";
import "dotenv/config";

const dialect = new PostgresDialect({
  pool: new pg.Pool(dbConnection),
});

export const db = new Kysely<Database>({
  dialect,
});

