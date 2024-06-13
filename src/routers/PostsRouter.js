import express from "express";
import {
  addPostsController,
  Posts,
  deleteOnePostsController,
  getOnePostsController,
  updatePostsController,
  Events,
  Blogs,
  Pics

} from "../controllers/PostsController";
import { protect } from "../middlewares/protect";
import { optionalProtect } from "../middlewares/optionalprotect";
const router = express.Router();
router.delete("/delete/:id", protect, deleteOnePostsController);   
router.post("/add", protect, addPostsController);
router.get("/", optionalProtect, Posts);
router.get("/events", optionalProtect, Events);
router.get("/blogs", optionalProtect, Blogs);
router.get("/pics", optionalProtect, Pics);

router.get("/one/:id", optionalProtect, getOnePostsController);
router.put("/update/:id", protect, updatePostsController);

export default router;
