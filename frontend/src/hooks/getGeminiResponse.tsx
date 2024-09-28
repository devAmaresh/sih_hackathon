import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_GEMINI_API);

const sanitizeInput = (input: string): string => {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const getGeminiResponse = async (input: string): Promise<string> => {
  const sanitizedInput = sanitizeInput(input);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an helpful ai chatbot expert in history and museums. If the question is related to history or museums, provide a concise and relevant answer. Do not provide any additional information for unrelated data:\n${sanitizedInput}`;

    const result = await model.generateContent(prompt);

    const response = result.response;
    const text =
      typeof response.text === "function" ? response.text() : response.text;
    const finalText = marked.parse(text);
    return finalText;
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    return "Sorry, there was an issue processing your request.";
  }
};

export default getGeminiResponse;
