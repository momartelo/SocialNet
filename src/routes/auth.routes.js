import { Router } from "express";
import { ctrlCreateUser, ctrlLoginUser } from "../controllers/user.controllers.js";
import { createUserValidations, loginUserValidations } from "../validations/user-validations.js";


const authRouter = Router();

authRouter.post("/login", loginUserValidations ,ctrlLoginUser) 
authRouter.post("/register", createUserValidations ,ctrlCreateUser)

export { authRouter }