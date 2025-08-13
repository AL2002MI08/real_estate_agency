import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "../src/routes/userRoute";
import { residencyRoute } from "../src/routes/residencyRoute";
import { AppDataSource } from "./config/database";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);


const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    console.warn("Continuing to run server without DB connection...");
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Connected to DB:", process.env.JWT_SECRET);
  });
};

startServer();
