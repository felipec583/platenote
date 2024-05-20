var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import cors from "cors";
import "dotenv/config";
import { ENVIRONMENT, PORT } from "./common/constants.js";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to this world" });
});
!ENVIRONMENT.TEST &&
    app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`LISTENING ON PORT ${PORT}`);
    }));
