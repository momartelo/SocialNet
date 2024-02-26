import { Router } from "express";
import { ctrlCreatePost, ctrlDeletePost, ctrlGetPost, ctrlListAllPosts, ctrlUpdatePost } from "../controllers/post.controllers.js";
import { createPostValidations, deletePostValidations, getPostValidations, listAllPostsValidations, updatePostValidations } from "../validations/post.validations.js";

const postRouter = Router();

postRouter.get("/", listAllPostsValidations ,ctrlListAllPosts) 
postRouter.post("/new", createPostValidations ,ctrlCreatePost) 
postRouter.get("/:postId", getPostValidations ,ctrlGetPost) 
postRouter.patch("/:postId", updatePostValidations ,ctrlUpdatePost)
postRouter.delete("/:postId", deletePostValidations ,ctrlDeletePost) 

export { postRouter }