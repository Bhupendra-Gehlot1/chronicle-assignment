
import { GoogleGenAI } from "@google/genai";
import { ERROR_MESSAGES, MODEL, PROMPT } from "../constants/service";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn(
    ERROR_MESSAGES.API_KEY_NOT_FOUND
  );
}

const genAI = new GoogleGenAI({ apiKey: API_KEY });

export async function continueWritingWithGemini(
  currentText: string
): Promise<string> {
  if (!genAI) {
    throw new Error(
      ERROR_MESSAGES.GENERATION_FAILED
    );
  }

  try {

    const response = await genAI.models.generateContent({
      model: MODEL,
      contents: PROMPT(currentText),
    });

    const continuation = response.text ?? "";
    return continuation;
  } catch (error) {
    console.error(ERROR_MESSAGES.GENERATION_FAILED, error);
    throw new Error(
      ERROR_MESSAGES.GENERATION_FAILED
    );
  }
}