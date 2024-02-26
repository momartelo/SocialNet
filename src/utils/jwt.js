import jwt from "jsonwebtoken";
import { config } from "../settings/config.js";

export const createJWT = async ({ userId, expiresIn }) => {
  return new Promise((res, rej) => {
    jwt.sign({ userId }, config.jwt_secret, { expiresIn } ,(err, token) => {
      if (err) rej(err);
      res(token);
    });
  });
};

// export const verifyJWT = async ({ token }) => {
//   return new Promise((res, rej) => {
//     jwt.verify(token, config.jwt_secret, (err, decoded) => {
//       if (err || !decoded.userId) rej("Token invalido");
//       res(decoded);
//     });
//   });
// };

export const verifyJWT = async ({ token }) => {
  try {
    const decoded = jwt.verify(token, config.jwt_secret);
    if (!decoded || !decoded.userId) {
      throw new Error("Token invalido");
    }
    return decoded;
  } catch (error) { 
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expirado");
    } else {
      throw new Error("Token invalido");
    }
 }
};