import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

try {
    if (process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI", error);
}

export const generateAgentResponse = async (
  userMessage: string, 
  context: string
): Promise<string> => {
  if (!ai) return "I'm currently offline (API Key missing). Please configure the environment.";

  try {
    const model = ai.models;
    
    const systemPrompt = `
      You are an "Agentforce Consultant Bot" living on the portfolio website of a high-end Salesforce Architect.
      Your goal is to impress potential clients with deep technical knowledge of Salesforce Data Cloud, Service Cloud, and Agentforce.
      
      Context about the architect's skills:
      - Expert in Data Cloud Identity Resolution.
      - Specialist in Service Cloud Voice (Amazon Connect).
      - Implements autonomous Service Agents using Agentforce.
      - Uses Vector Databases for grounding.

      Current User Context: ${context}

      Keep responses professional, concise, and persuasive. Use "We" or "I" to refer to the consultant.
      If asked about the 3D visual, explain it represents the Data Cloud Data Model Objects (DMOs) and their relationships to the CRM.
    `;

    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + "\n\nUser Question: " + userMessage }] }
      ],
    });

    return response.text || "I couldn't generate a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am experiencing high traffic. Please try again later.";
  }
};