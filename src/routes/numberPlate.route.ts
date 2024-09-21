import Express from "express";
import { numberPlateController } from "../controllers/dependencies.js";

const router = Express.Router();
router.get(
  "/",
  numberPlateController.findAll.bind(numberPlateController)
);

router.get(
  "/search",
  numberPlateController.findByPattern.bind(numberPlateController)
);
router.get(
  "/suggestion/search",
  numberPlateController.findSuggestions.bind(numberPlateController)
);
router.get(
  "/:id",
  numberPlateController.findById.bind(numberPlateController)
);
router.put("/", numberPlateController.updateTenant.bind(numberPlateController));

export default router;
