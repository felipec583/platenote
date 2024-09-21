import Express from "express";
import { numberPlateListController } from "../controllers/dependencies.js";

const router = Express.Router();

router.post(
  "/",
  numberPlateListController.create.bind(numberPlateListController)
);

router.get(
  "/",
  numberPlateListController.findLists.bind(numberPlateListController)
);
router.get(
  "/current",
  numberPlateListController.findCurrent.bind(numberPlateListController)
);
router.get(
  "/shift",
  numberPlateListController.findByShift.bind(numberPlateListController)
);

router.get(
  "/previous-list",
  numberPlateListController.findPreviousFromCurrentList.bind(
    numberPlateListController
  )
);

router.get(
  "/:id",
  numberPlateListController.findById.bind(numberPlateListController)
);

router.delete(
  "/:id",
  numberPlateListController.delete.bind(numberPlateListController)
);
export default router;
