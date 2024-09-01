import numberPlateRoute from "./numberPlate.route.js";
import numberPlateListRoute from "./numberPlateList.route.js";
import numberPlateEntryRoute from "./numberPlateEntry.route.js";
import express from "express";

const router = express.Router();

router.use("/number-plate", numberPlateRoute);
router.use("/lists", numberPlateListRoute);
router.use("/entry", numberPlateEntryRoute);

export default router;
