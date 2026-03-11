import express from "express";
import cors from "cors";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", chatbotRoutes);
app.use("/api", healthRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
