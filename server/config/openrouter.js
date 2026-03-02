import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";

dotenv.config();

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
    "X-Title": process.env.SITE_NAME || "Yonas Portfolio",
  },
});

export default openRouter;
