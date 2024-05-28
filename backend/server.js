import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath function
import router from "./routes/authRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import ConnectMongo from "./db/connection.js";
import UserRouter from "./routes/userRoutes.js";

const app = express();
dotenv.config({ path: "config.env" });
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Serve frontend files statically
app.use(express.static("frontend/dist"));

// Get the directory name of the current module using import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// API routes
app.use("/api/auth", router);
app.use("/api/messages", messageRouter);
app.use("/api/users", UserRouter);

// Catch-all route to serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
});

const Port = process.env.PORT || 3000;

app.listen(Port, () => {
  ConnectMongo();
  console.log(`Running server at http://localhost:${Port}`);
});
