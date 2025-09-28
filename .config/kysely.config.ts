import { defineConfig } from "kysely-ctl";
import { dialect } from "../src/config/db-connection.js";
export default defineConfig({
  dialect,
  migrations: {
    migrationFolder: "../src/db/migrations",
  },
  //   plugins: [],
  //   seeds: {
  //     seedFolder: "seeds",
  //   }
});
