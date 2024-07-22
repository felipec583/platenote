import Express from "express";
import { numberPlateEntryController } from "../controllers/dependencies.js";
const router = Express.Router();


router.post("/", numberPlateEntryController.create.bind(numberPlateEntryController) );

export default router;