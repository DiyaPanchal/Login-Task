import express from "express";
import apiRouter from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 3002;

app.use("/", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
