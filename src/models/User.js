import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";

const UserSchema = new Schema({
    avatar: { 
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            },
            message: "El correo electronico no es valido",
        },
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (username) => {
                return /^[a-zA-Z0-9]+$/.test(username);
            },
            message: "El nombre de usuario solo puede contener letras y numeros"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128,
        // select: false,
    },

    name: {
        type: String,
        required: true,
        validate: {
            validator: (name) => {
                return name.length >= 2 && name.length <= 50;
            },
            message: "El nombre debe tener entre 2 y 50 caracteres"
        },
    },

    role:{
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },

    preferences: {
        type: Object,
        default: {
          language: 'es',
          notifications: {
            email: true,
            push: false,
          },
        },
    },
},
{
    timestamps: true,
    versionKey: false,
},
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
});

export const UserModel = model("User", UserSchema);