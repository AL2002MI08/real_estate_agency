import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "../src/routes/userRoute";
import { residencyRoute } from "../src/routes/residencyRoute";
import { AppDataSource } from "./config/database";
import { setupSwagger } from "./swagger";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

setupSwagger(app)

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");
  } catch (error) {

    console.warn("Continuing to run server without DB connection...");
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
