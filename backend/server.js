import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/authRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import ConnectMongo from "./db/connection.js";
import UserRouter from "./routes/userRoutes.js";
import { fileURLToPath } from "url"; // Import the fileURLToPath function from the 'url' module
import path from "path"; // Import the path module

const __filename = fileURLToPath(import.meta.url); // Define __filename using fileURLToPath
const __dirname = path.dirname(__filename);
const app = express();

dotenv.config({ path: "config.env" });
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/message", messageRouter);
app.use("/api/users", UserRouter);

const Port = process.env.PORT || 3000;
//
//
if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist"));
} else {
  app.use(express.static("frontend")); // Assuming frontend folder name
}
app.get("*", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  } else {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
  }
});
//
//
app.listen(Port, () => {
  ConnectMongo();
  console.log(`running server at http://localhost:${Port}`);
});
