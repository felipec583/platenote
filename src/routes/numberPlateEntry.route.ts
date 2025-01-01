import Express from "express";
import { numberPlateEntryController } from "../controllers/dependencies.js";
import { verifyTokenMiddleware } from "../middleware/verifyJWT.middleware.js";
const router = Express.Router();

router.post(
  "/", verifyTokenMiddleware,
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
  numberPlateEntryController.updateNumberPlate.bind(numberPlateEntryController)
);
export default router;
