import Express from "express";
import { authController } from "../controllers/dependencies.js";
import { validateUser } from "../schemas/index.js";

const router = Express.Router();

router.post(
  "/signup",
  validateUser,
  authController.signUp.bind(authController)
);
router.post("/login", validateUser, authController.login.bind(authController));

export default router;
