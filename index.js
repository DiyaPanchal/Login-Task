import express from "express";

const app = express();
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
