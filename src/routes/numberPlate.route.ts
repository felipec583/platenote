import Express from "express";
import { numberPlateController } from "../controllers/dependencies.js";

const router = Express.Router();
router.get(
  "/",
  numberPlateController.getAllPlateNumbers.bind(numberPlateController)
);

router.get(
  "/search",
  numberPlateController.getNumberPlatesByPattern.bind(numberPlateController)
);
router.get(
  "/:id",
  numberPlateController.getPlateNumber.bind(numberPlateController)
);
router.put("/", numberPlateController.updateTenant.bind(numberPlateController));

export default router;
