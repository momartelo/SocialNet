import * as bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";
import { createJWT } from "../utils/jwt.js";

export const ctrlCreateUser = async (req, res) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            error: "No se pudo crear el usuario",
        });
        
    }
};

export const ctrlLoginUser = async(req, res) => {
    try {

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user || !user.password) {
            console.log("Invalid user or password field is missing");
            return res.status(404).json({ error: "Credencial invalida" })}

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        return res
        .status(400)
        .json({ error: "Credencial invalida" });

        const expiresIn = 36000;
        const token = await createJWT({ userId: user._id, expiresIn });
        res.status(200).json({ token, user });

    } catch (error) {
        const errorMessage = "No se pudo loguear el usuario";
        console.error(errorMessage, error);
        res.status(500).json({
            error: errorMessage
        });
    }
};