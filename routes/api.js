import express from "express";
import * as UserController from "../controllers/User.js";

const apiRouter = express.Router();

apiRouter.get("/", UserController.userLogin);

export default apiRouter;