import { Router } from "express";
import { ctrlLikeComment } from "../controllers/like.controller.js";
import { likeCommentValidations } from "../validations/like.validations.js";


const likeRouter = Router();

likeRouter.post("/:postId/:commentId/like", likeCommentValidations ,ctrlLikeComment) 

export { likeRouter }