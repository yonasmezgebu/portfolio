import dotenv from "dotenv";
import fetch from "node-fetch"; // install with: npm install node-fetch

dotenv.config();

(async () => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
    });

    const models = await response.json();

    // Filter for free models
    const freeModels = models.data.filter(
      m => m.pricing.prompt === "0" && m.pricing.completion === "0"
    );

    console.log("Available free models:");
    freeModels.forEach(m => console.log(`- ${m.id}`));
  } catch (error) {
    console.error("Error fetching models:", error);
  }
})();
