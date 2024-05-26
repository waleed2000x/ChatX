import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import routeProtector from "../middlewares/routeProtector.js";

const messageRouter = express.Router();

messageRouter.get("/:id", routeProtector, getMessages);
messageRouter.post("/send/:id", routeProtector, sendMessage);

export default messageRouter;
