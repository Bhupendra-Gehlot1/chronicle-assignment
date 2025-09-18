export const MODEL = "gemini-2.0-flash-001";

export const ERROR_MESSAGES = {
  GENERATION_FAILED:
    "Failed to generate AI content. Please check your API key and try again.",
  NETWORK_ERROR: "Network error occurred. Please check your connection.",
  API_KEY_NOT_FOUND:
    "Gemini API key not found. Please add VITE_GEMINI_API_KEY to your environment variables.",
} as const;

export const PROMPT = (
  currentText: string
) => `You are an AI writing assistant. The user has written the following text and wants you to continue it naturally and coherently. Please continue the writing in a way that flows seamlessly from what they've already written. Keep the same tone, style, and theme. Write only the continuation (don't repeat the existing text), and limit your response to 4-5 sentences that feel like a natural next part of their writing.

Current text:
"${currentText}"

Continue writing:`;
