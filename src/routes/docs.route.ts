import Express from "express";
import { swaggerUiSetup } from "../config/swagger.js";
import swaggerUi from "swagger-ui-express";

const router = Express.Router();

router.use("/", swaggerUi.serve);
router.get("/", swaggerUiSetup);

export default router;
