import express from "express";
import cors from "cors";
import "dotenv/config";
import { ENVIRONMENT, PORT } from "./common/constants.js";
import appRouter from "./routes/index.js";
import { errorMiddleware, loggerMiddleware } from "./middleware/index.js";
export const app = express();
app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);
app.use("/api/v1", appRouter);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to this world" });
});
app.use(errorMiddleware);
app.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

!ENVIRONMENT.TEST &&
  app.listen(PORT, async () => {
    console.log(`LISTENING ON PORT ${PORT}`);
  });
