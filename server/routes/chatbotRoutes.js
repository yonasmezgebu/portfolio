import express from "express";
import { runCopilotAgent } from "../agent/copilotAgent.js";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const router = express.Router();

// Rate limiting middleware: max 15 requests per minute
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 15,
  message: { success: false, error: "Too many requests from this IP, please try again after a minute" }
});

const chatSchema = z.object({
  message: z.string().min(1, "Message must be a non-empty string").max(1000, "Message is too long"),
  sessionId: z.string().optional()
});

router.post("/chat", apiLimiter, async (req, res) => {
  try {
    const parsed = chatSchema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors[0].message,
      });
    }

    const { message, sessionId } = parsed.data;
    const result = await runCopilotAgent(message, sessionId);
    
    res.json(result);
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({
      success: false,
      error: "An internal server error occurred while processing your request.",
    });
  }
});

export default router;
