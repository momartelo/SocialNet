import { header, param, body } from "express-validator";
import { isValidObjectId } from "mongoose";
import { applyValidations } from "../middlewares/apply-validations.js";

export const likeCommentValidations = [
    param("postId")
    .notEmpty()
    .withMessage("El parametro { postId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { postId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage(
        "El parametro { postId } debe ser una id valida.",
    ),
    applyValidations,
]