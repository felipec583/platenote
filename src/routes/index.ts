import numberPlateRoute from "./numberPlate.route.js";
import express from "express";

const router = express.Router();

router.use("/number-plate", numberPlateRoute);

export default router;
