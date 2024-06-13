import express from "express";
import {
  addKorariController,
  Korari,
  deleteOneKorariController,
  getOneKorariController,
  updateKorariController,
} from "../controllers/KorariController";
import { protect } from "../middlewares/protect";
import { optionalProtect } from "../middlewares/optionalprotect";

const router = express.Router();
router.delete("/delete/:id", protect, deleteOneKorariController);   
router.post("/add", protect, addKorariController);
router.get("/", optionalProtect, Korari);
router.get("/one/:id", optionalProtect, getOneKorariController);
router.put("/update/:id", protect, updateKorariController);
export default router;
