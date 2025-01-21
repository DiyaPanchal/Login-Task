import express from "express";
import bodyParser from "body-parser";
import * as UserController from "../controllers/User.js";

const apiRouter = express.Router();

apiRouter.use(bodyParser.json());
apiRouter.post("/user/signup", UserController.userSignup);
apiRouter.post("/user/login", UserController.userLogin);
apiRouter.get("/user/list", UserController.userList);
apiRouter.put("/user/update/:id", UserController.userUpdate);
apiRouter.delete("/user/delete/:id", UserController.userDelete);

export default apiRouter;
