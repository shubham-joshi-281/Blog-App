import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./connect/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
// dotenv config
dotenv.config();

// es Module

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Rest Object
const app = express();

// middleWare
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

app.use("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// port at listen

// app listen
const start = () => {
  connectDB();
  const PORT = process.env.PORT || "8080";
  app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
  });
};
start();
