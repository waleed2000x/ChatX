import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import router from "./routes/authRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import ConnectMongo from "./db/connection.js";

const app = express();
dotenv.config({ path: "config.env" });
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/message", messageRouter);

const Port = process.env.PORT || 3000;

app.listen(Port, () => {
  ConnectMongo();
  console.log("running server at http://localhost:2000");
});
