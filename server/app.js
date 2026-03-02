import express from "express";
import cors from "cors";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors()); // allow requests from anywhere
app.use(express.json());

app.use("/api", chatbotRoutes);
app.use("/api", healthRoutes);

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
