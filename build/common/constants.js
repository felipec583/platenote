import "dotenv/config";
const { NODE_ENV, LOCAL_DB, LOCAL_DB_HOST, LOCAL_DB_USER, LOCAL_DB_PASSWORD, LOCAL_DB_PORT, PROD_DB, PROD_DB_HOST, PROD_DB_USER, PROD_DB_PASSWORD, PROD_DB_PORT, PORT, } = process.env;
const PROD = NODE_ENV === "production";
const DEV = NODE_ENV === "development";
const TEST = NODE_ENV === "testing";
const ENVIRONMENT = {
    PROD,
    DEV,
    TEST,
};
const dbConnection = {
    database: ENVIRONMENT.PROD ? PROD_DB : LOCAL_DB,
    host: ENVIRONMENT.PROD ? PROD_DB_HOST : LOCAL_DB_HOST,
    user: ENVIRONMENT.PROD ? PROD_DB_USER : LOCAL_DB_USER,
    password: ENVIRONMENT.PROD ? PROD_DB_PASSWORD : LOCAL_DB_PASSWORD,
    port: ENVIRONMENT.PROD ? +PROD_DB_PORT : +LOCAL_DB_PORT,
};
export { dbConnection, ENVIRONMENT, PORT };
