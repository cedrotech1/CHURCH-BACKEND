import express from "express";
import {
  addKorariController,
  Korari,
  deleteOneKorariController,
  getOneKorariController,
  updateKorariController,
  Statistics
} from "../controllers/KorariController";
import { protect } from "../middlewares/protect";
import { optionalProtect } from "../middlewares/optionalprotect";

const router = express.Router();
router.delete("/delete/:id", protect, deleteOneKorariController);   
router.post("/add", protect, addKorariController);
router.get("/", optionalProtect, Korari);
router.get("/statistic", optionalProtect, Statistics);
router.get("/one/:id", optionalProtect, getOneKorariController);
router.put("/update/:id", protect, updateKorariController);
export default router;
