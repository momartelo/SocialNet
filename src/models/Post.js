import { Schema, model, Types } from "mongoose";


const PostSchema = new Schema(
{
    description: {
        type: String,
        required: true,
        maxlegth: 1000,
    },
    image: {
        type: String,
    },
    comments: [{
        type: Types.ObjectId,
        ref: "Comment",
    }],
    author: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
},
{
    timestamps: true,
    versionKey: false,
},
);

PostSchema.index({ author: 1, createdAt: -1 }); // Índice para búsquedas por autor y ordenados por fecha

export const PostModel = model("Post", PostSchema);