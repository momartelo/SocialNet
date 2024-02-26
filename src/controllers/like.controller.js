import { CommentModel } from "../models/Comment.js";


export const ctrlLikeComment = async(req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;
    try {
        const comment = await CommentModel.findById(commentId);
        if(!comment) {
            throw new Error("El comentario no fue encontrado");
        }
        const hasLiked = comment.likes.includes(userId);

        if (hasLiked) {
            comment.likes.pull(userId);
        } else {
            comment.likes.push(userId);
        }
        
        await comment.save();
        return res.status(201).json(comment);
    } catch (error) {
      return res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
}

// // Función para dar like a un comentario
// async function darLikeAComentario(commentId, userId) {
//     try {
//         // Buscar el comentario por su ID
//         const comentario = await CommentModel.findById(commentId);

//         if (!comentario) {
//             throw new Error("El comentario no fue encontrado");
//         }

//         // Verificar si el usuario ya ha dado like
//         if (comentario.likes.includes(userId)) {
//             throw new Error("El usuario ya ha dado like a este comentario");
//         }

//         // Agregar el ID del usuario a los likes del comentario
//         comentario.likes.push(userId);

//         // Guardar el comentario actualizado
//         await comentario.save();

//         return comentario;
//     } catch (error) {
//         if (error.message === "El comentario no fue encontrado") {
//           return res.status(404).json({ error: "El comentario no fue encontrado" });
//         } else if (error.message === "El usuario ya ha dado like a este comentario") {
//           return res.status(400).json({ error: "El usuario ya ha dado like a este comentario" });
//         } else {
//           throw error;
//         }
//       }
// }

// // Función para quitar like a un comentario
// async function quitarLikeAComentario(commentId, userId) {
//     try {
//         // Buscar el comentario por su ID
//         const comentario = await CommentModel.findById(commentId);

//         if (!comentario) {
//             throw new Error("El comentario no fue encontrado");
//         }

//         // Verificar si el usuario ha dado like
//         const likeIndex = comentario.likes.indexOf(userId);
//         if (likeIndex === -1) {
//             throw new Error("El usuario no ha dado like a este comentario");
//         }

//         // Quitar el like del usuario del array de likes
//         comentario.likes.splice(likeIndex, 1);

//         // Guardar el comentario actualizado
//         await comentario.save();

//         return comentario;
//     } catch (error) {
//         throw error;
//     }
// }

// // Uso de las funciones para dar y quitar like
// const comentarioId = 'ID_DEL_COMENTARIO';
// const userId = 'ID_DEL_USUARIO';

// darLikeAComentario(comentarioId, userId)
//     .then(comentario => {
//         console.log('Se dio like al comentario:', comentario);
//     })
//     .catch(error => {
//         console.error('Error al dar like al comentario:', error.message);
//     });

// quitarLikeAComentario(comentarioId, userId)
//     .then(comentario => {
//         console.log('Se quitó el like al comentario:', comentario);
//     })
//     .catch(error => {
//         console.error('Error al quitar like al comentario:', error.message);
//     });
