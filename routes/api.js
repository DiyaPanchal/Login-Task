import express from "express";

const apiRouter = express.Router();

apiRouter.get("/", (req,res) => {
   res.send("Hello World!");
});

export default apiRouter;