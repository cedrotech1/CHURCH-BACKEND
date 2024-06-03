import express from "express";
import {
  addPostsController,
  Posts,
  approvePostsController,
  rejectPostsController,
  deleteOnePostsController,
  getOnePostsController,
  pendingController,
  updatePostsController,
  ckeckPostsController,
  unckeckPostsController,
  uploadPdf
} from "../controllers/PostsController";
import { protect } from "../middlewares/protect";
const router = express.Router();
router.delete("/delete/:id", protect, deleteOnePostsController);   
router.post("/add", protect, addPostsController);
router.get("/", protect, Posts);
// router.get("/pending", protect, pendingController);
router.get("/one/:id", protect, getOnePostsController);
router.put("/approve/:id", protect, approvePostsController);
router.put("/check/:id", protect, ckeckPostsController);
router.put("/uncheck/:id", protect, unckeckPostsController);
router.put("/reject/:id", protect, rejectPostsController);
router.put("/update/:id", protect, updatePostsController);
// Add the upload route
router.post('/upload/:id',protect, uploadPdf);

export default router;
