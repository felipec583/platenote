import Express from "express";
import { numberPlateListController } from "../controllers/dependencies.js";

const router = Express.Router();

router.post(
  "/",
  numberPlateListController.createPlateList.bind(numberPlateListController)
);

router.get(
  "/",
  numberPlateListController.getLists.bind(numberPlateListController)
);
router.get(
  "/current",
  numberPlateListController.getCurrentList.bind(numberPlateListController)
);
router.get(
  "/shift",
  numberPlateListController.getListsByShift.bind(numberPlateListController)
);

router.get(
  "/:id",
  numberPlateListController.getListById.bind(numberPlateListController)
);

router.delete(
  "/:id",
  numberPlateListController.delete.bind(numberPlateListController)
);
export default router;
