import openrouter from "../config/openrouter.js";

const fallbackModels = [
  
  // Free Models Router (most reliable)
  "openrouter/free",
  
  // DeepSeek models (confirmed available)
  "deepseek/deepseek-r1:free",
  "deepseek/deepseek-chat:free",
  
  // Trinity models (confirmed available)
  "arcee-ai/trinity-large-preview:free",
  "arcee-ai/trinity-mini:free",
  
  // Solar models (confirmed available)
  "upstage/solar-pro-3:free",
  
  // Llama models (try these variations)
  "meta-llama/llama-3.2-3b-instruct:free",
  "meta-llama/llama-3.2-1b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  
  // Qwen models (mentioned in docs)
  "qwen/qwen-2.5-7b-instruct:free",
  "qwen/qwen-2.5-14b-instruct:free",
  
  // Additional free models to try
  "google/gemma-2-9b-it:free",
  "microsoft/phi-3-mini-128k-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "huggingface/zephyr-7b-beta:free",
  "openchat/openchat-7b:free",
  "nousresearch/nous-hermes-2-mixtral-8x7b-dpo:free"
];



export async function runCopilotAgent(userMessage, sessionId = null) {
  for (const model of fallbackModels) {
    try {
      const result = await openrouter.callModel({
        model,
        input: userMessage,
        maxTokens: 2000, // safe for free tier
      });

      const text = await result.getText();

      return {
        success: true,
        modelUsed: model,
        message: text,
        sessionId: sessionId || Date.now().toString(),
      };
    } catch (error) {
      console.warn(`❌ ${model} failed: ${error.message}`);
    }
  }

  return {
    success: false,
    error: "No free models available at the moment.",
  };
}
