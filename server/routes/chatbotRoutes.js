import express from "express";
import { runCopilotAgent } from "../agent/copilotAgent.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body;

  // ✅ Validate input
  if (!message || typeof message !== "string") {
    return res.status(400).json({
      success: false,
      error: "Message must be a non-empty string",
    });
  }

  const result = await runCopilotAgent(message, sessionId);
  res.json(result);
});

export default router;
