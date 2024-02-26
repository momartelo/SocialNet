import express  from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import cookieParser from "cookie-parser";

import { config } from "./src/settings/config.js";
import { startConnection } from "./src/settings/database.js"; 
import { authRouter } from "./src/routes/auth.routes.js";
import { postRouter } from "./src/routes/posts.routes.js";
import { authHeader } from "./src/validations/auth-validation.js";
import { validateToken } from "./src/middlewares/validate-token.js";

import { likeRouter } from "./src/routes/likes.routes.js";
import { commentRouter } from "./src/routes/comments.routes.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
})
);

app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/posts",  authHeader, validateToken ,postRouter);
app.use("/api/comments",authHeader, validateToken, commentRouter)
app.use("/api/likes", authHeader, validateToken, likeRouter);

app.listen(config.port, async() => {
    await startConnection({
        uri: config.mongo,
        database: config.database,
    });
    console.log("Server is running on port: http://localhost:" + config.port);
});

