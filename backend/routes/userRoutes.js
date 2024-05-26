import express from "express";
import routeProtector from "../middlewares/routeProtector.js";
import { getUsersForSidebar } from "../controllers/userController.js";

const UserRouter = express.Router();

UserRouter.get("/", routeProtector, getUsersForSidebar);

export default UserRouter;
