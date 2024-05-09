import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/getposts", getPosts);
router.delete("/delete/:id", verifyToken, deletePost);
router.get("/get/:id", getPost);
router.patch("/update/:id", verifyToken, updatePost);

export default router;
