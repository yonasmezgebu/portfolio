import dotenv from "dotenv";
import { OpenRouter } from "@openrouter/sdk";

dotenv.config();

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const testModels = [
  "meta-llama/llama-3.1-8b-instruct:free",
  "meta-llama/llama-3.1-70b-instruct:free",
  "microsoft/phi-3-mini-128k-instruct:free",
  "google/gemma-2-9b-it:free"
];

(async () => {
  for (const model of testModels) {
    try {
      const response = await openrouter.callModel({
        model,
        input: "Hello Copilot!",
        maxTokens: 200, // safe small test
      });
      const text = await response.getText();
      console.log(`✅ ${model} works: ${text}`);
      break; // stop after first success
    } catch (error) {
      console.log(`❌ ${model} not available: ${error.message}`);
    }
  }
})();
