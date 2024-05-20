import express from "express";
import cors from "cors";
import "dotenv/config";
import { ENVIRONMENT, PORT } from "./common/constants.js";

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to this world" });
});

!ENVIRONMENT.TEST &&
  app.listen(PORT, async () => {
    console.log(`LISTENING ON PORT ${PORT}`);
  });
