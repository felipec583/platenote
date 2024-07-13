import { PoolConfig } from "pg";
import "dotenv/config";
const {
  NODE_ENV,
  LOCAL_DB,
  LOCAL_DB_HOST,
  LOCAL_DB_USER,
  LOCAL_DB_PASSWORD,
  LOCAL_DB_PORT,
  PROD_DB,
  PROD_DB_HOST,
  PROD_DB_USER,
  PROD_DB_PASSWORD,
  PROD_DB_PORT,
  PORT,
} = process.env;

const PROD = NODE_ENV === "production";
const DEV = NODE_ENV === "development";
const TEST = NODE_ENV === "testing";

const ENVIRONMENT = {
  PROD,
  DEV,
  TEST,
};

const dbConnection: PoolConfig = {
  database: ENVIRONMENT.PROD ? PROD_DB : LOCAL_DB,
  host: ENVIRONMENT.PROD ? PROD_DB_HOST : LOCAL_DB_HOST,
  user: ENVIRONMENT.PROD ? PROD_DB_USER : LOCAL_DB_USER,
  password: ENVIRONMENT.PROD ? PROD_DB_PASSWORD : LOCAL_DB_PASSWORD,
  port: ENVIRONMENT.PROD ? +PROD_DB_PORT! : +LOCAL_DB_PORT!,
};

const START_MORNING = 5;
const END_MORNING = 11;

const START_EVENING = 18;
const END_EVENING = 22;

const TIME = {
  START_EVENING,
  START_MORNING,
  END_EVENING,
  END_MORNING
};

export { dbConnection, ENVIRONMENT, PORT, TIME };
