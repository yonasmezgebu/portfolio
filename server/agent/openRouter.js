import { OpenRouter } from "@openrouter/sdk";

// ✅ Initialize OpenRouter once, with your API key
const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY, // stored in .env
});

export default openrouter;
