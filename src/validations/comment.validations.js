import { header, param, body } from "express-validator";
import { isValidObjectId } from "mongoose";
import { applyValidations } from "../middlewares/apply-validations.js";

export const createCommentValidations = [
    body("comment")
    .notEmpty()
    .withMessage("El campo { comment } no debe estar vacio")
    .isString()
    .withMessage("El campo { comment } debe ser un string"),
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
];

export const listCommentsValidations = [
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
];

export const getCommentValidations = [
    param("postId")
    .notEmpty()
    .withMessage("El parametro { postId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { postId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage(
        "El parametro { postId } debe ser una id valida.",
    ),
    param("commentId")
    .notEmpty()
    .withMessage("El parametro { commentId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { commentId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage(
        "El parametro { commentId } debe ser una id valida.",
    ),
applyValidations,
];


export const updateCommentValidations = [
    body("comment")
    .notEmpty()
    .withMessage("El campo { comment } no debe estar vacio")
    .isString()
    .withMessage("El campo { comment } debe ser un string"),
    param("postId")
    .notEmpty()
    .withMessage("El parametro { postId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { postId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage(
        "El parametro { postId } debe ser una id valida.",
    ),
    param("commentId")
    .notEmpty()
    .withMessage("El parametro { commentId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { commentId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage(
        "El parametro { commentId } debe ser una id valida.",
    ),
applyValidations,
];

export const deleteCommentValidations = [
    param("postId")
    .notEmpty()
    .withMessage("El parametro { postId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { postId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage(
        "El parametro { postId } debe ser una id valida.",
    ),
    param("commentId")
    .notEmpty()
    .withMessage("El parametro { commentId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { commentId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage(
        "El parametro { commentId } debe ser una id valida.",
    ),
applyValidations,
];

export const createReplyValidations = [
    body("comment")
    .notEmpty()
    .withMessage("El campo { comment } no debe estar vacio")
    .isString()
    .withMessage("El campo { comment } debe ser un string"),
    param("postId")
    .notEmpty()
    .withMessage("El parametro { postId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { postId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage(
        "El parametro { postId } debe ser una id valida.",
    ),
    param("commentId")
    .notEmpty()
    .withMessage("El parametro { commentId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { commentId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage(
        "El parametro { commentId } debe ser una id valida.",
    ),
applyValidations,
];