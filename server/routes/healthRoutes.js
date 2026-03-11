import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    apiKeyConfigured: !!process.env.OPENROUTER_API_KEY,
  });
});

export default router;
