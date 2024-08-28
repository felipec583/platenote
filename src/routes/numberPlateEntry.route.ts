import Express from "express";
import { numberPlateEntryController } from "../controllers/dependencies.js";
const router = Express.Router();

router.post(
  "/",
  numberPlateEntryController.create.bind(numberPlateEntryController)
);

router.delete(
  "/",
  numberPlateEntryController.delete.bind(numberPlateEntryController)
);

router.patch(
  "/left",
  numberPlateEntryController.updateHasLeftStatus.bind(
    numberPlateEntryController
  )
);

router.patch(
  "/registration",
  numberPlateEntryController.updateIsRegisteredStatus.bind(
    numberPlateEntryController
  )
);

router.put(
  "/plate",
  numberPlateEntryController.changeNumberPlate.bind(numberPlateEntryController)
);
export default router;
