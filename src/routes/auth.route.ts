import Express from "express";
import { authController } from "../controllers/dependencies.js";
import { validateUserCreate } from "../schemas/index.js";

const router = Express.Router();

router.post(
  "/signup",
  validateUserCreate,
  authController.signUp.bind(authController)
);

export default router;
