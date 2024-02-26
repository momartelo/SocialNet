import { Router } from "express";
import { ctrlCreateComment, ctrlCreateReply, ctrlDeleteComment, ctrlGetCommentById, ctrlListComments, ctrlUpdateComment } from "../controllers/comment.controllers.js";
import { createCommentValidations, createReplyValidations, deleteCommentValidations, getCommentValidations, listCommentsValidations, updateCommentValidations } from "../validations/comment.validations.js";


const commentRouter = Router();

commentRouter.get("/:postId", listCommentsValidations ,ctrlListComments) 
commentRouter.post("/:postId", createCommentValidations ,ctrlCreateComment) 
commentRouter.post("/:postId/:commentId/reply", createReplyValidations ,ctrlCreateReply)
commentRouter.get("/:postId/:commentId", getCommentValidations ,ctrlGetCommentById)
commentRouter.patch("/:postId/:commentId", updateCommentValidations ,ctrlUpdateComment)
commentRouter.delete("/:postId/:commentId", deleteCommentValidations ,ctrlDeleteComment)

export { commentRouter }