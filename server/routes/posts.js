import express from "express";
import { createPost, getPosts,deletePost,likePost,updatePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();
 
router.get('/',getPosts);
router.post('/',auth,createPost);
router.delete('/:id', auth,deletePost);
router.patch('/:id',auth,updatePost);
router.patch('/:id/likePost',auth, likePost);

export default router;
