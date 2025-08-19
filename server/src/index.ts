import 'module-alias/register';
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./routes/userRoute";
import { residencyRoute } from "./routes/residencyRoute"; 
import { AppDataSource } from "./config/database";
import { setupSwagger } from "./swagger"; 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);
setupSwagger(app);

const startServer = async () => {
  try {
 
    await AppDataSource.initialize();

  } catch (error) {
    console.error("Database error:", error);
  }

  app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
  });
};

startServer();