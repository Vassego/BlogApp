import express, { json } from "express";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import connectDB from "./config/db.js";
config();
const app = express();
app.use(cors());
app.use(json());
app.use(morgan("dev"));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
const PORT=8080
app.listen(PORT, () => {
  console.log(
    `Server Running on  port no ${PORT}`   
  );
  connectDB();
});
