import { CommentModel } from "../models/Comment.js";
import { PostModel } from "../models/Post.js";

export const ctrlCreatePost = async (req, res) => {
    const userId = req.user._id;

    try {
 
        if (!req.user) {
            return res.status(401).json({ error: "Hola Usuario no autenticado" });
        }
        const { description, image } = req.body;
        const post = new PostModel({
            description,
            image,
            author: userId,
        })
        await post.save();
        return res.status(201).json(post);

    } catch (error) {
        return res.status(500).json({ error: "No se pudo crear el post",
        detail: error.message });
    }
};


export const ctrlListAllPosts = async(req, res) => {
    try {
        const pageSize = parseInt(req.query.pageSize, 10)  || 10;
        if (isNaN(pageSize) || pageSize <=0) {
            return res.status(400).json({ error: "Tamaño de pagina invalido" })
        }
        const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
        if (isNaN(pageNumber) || pageNumber <= 0) {
            return res.status(400).json({ error: "Numero de pagina invalido" })
        }

        const posts = await PostModel.find()
        .populate("author",["username", "avatar"])
        .populate("comments", ["comment", "createdAt"])
        .sort({ date: -1 })
        .skip(pageSize * (pageNumber - 1))
        .limit(pageSize)
        
        return res.status(200).json(posts)

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const ctrlGetPost = async(req, res) => {
    const { postId } = req.params;

    try {
        const post = await PostModel.findOne({ _id:postId, })
        .populate("author",["username", "avatar"])
        .populate("comments", ["comment", "createdAt"])

        if(!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }
        return res.status(200).json(post);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

export const ctrlUpdatePost = async(req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;

    try {
        const post = await PostModel.findOne({
            _id: postId,
            author: userId,
        });

        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }

        post.set(req.body);
        await post.save();
        return res.status(200).json(post);

    } catch (error) {
        return res.status(500).json({ error: error.message });        
    }
};

export const ctrlDeletePost = async(req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;

    try {
        const post = await PostModel.findOne ({ _id: postId, author: userId, });

        if(!post) {
            return res.status(404).json({ error: "Post no encontrado"  });
        }

        await CommentModel.deleteMany({ _id: { $in: post.comments }, }); 
        await PostModel.findOneAndDelete({ _id: postId, author: userId, });

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message, stack: error.stack, details: "Error al borrar el post. Detalles del post:" + JSON.stringify(post), });
    }
};

export const isAuthor = async ({ postId, userId }) => {
    try {
        const post = await PostModel.findOne({
            _id: postId,
            author: userId,
        });

        if (!post) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};