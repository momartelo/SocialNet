import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true,
        maxlenght: 1000,
    },
    post: {
        type: Types.ObjectId,
        ref: "Post",
        required: true,
    },
    author: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    parentComment: {
        type: Types.ObjectId,
        ref: "Comment",
    },
    likes: [{
        type: Types.ObjectId,
        ref:"User"
    }],   
    replies: [{
        type: Types.ObjectId,
        ref: "Comment",
    }],
    depth: {
        type: Number,
        min: 1,
        max: 3,
        default: 1,
    }
},
{
    timestamps: true,
    versionKey: false,
},
);

CommentSchema.index({ post: 1, createdAt: -1 }); // Índice para búsquedas por post y ordenados por fecha

export const CommentModel = model("Comment", CommentSchema);



