import { GoogleGenAI } from "@google/genai";
import { Fund, Transaction } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize specific model
let ai: GoogleGenAI | null = null;
if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
}

export const getFinancialAdvice = async (
  funds: Fund[],
  transactions: Transaction[],
  query: string
): Promise<string> => {
  if (!ai) {
    return "API Key is missing. Please configure your Gemini API Key.";
  }

  const model = "gemini-2.5-flash";
  
  const portfolioSummary = funds.map(f => 
    `- ${f.name} (${f.category}): ₹${f.balance.toLocaleString()} (Trend: ${f.trend})`
  ).join('\n');

  const recentTx = transactions.slice(0, 5).map(t =>
    `- ${t.date}: ${t.type.toUpperCase()} ₹${t.amount} (${t.description})`
  ).join('\n');

  const prompt = `
    You are KingPay's elite AI Financial Advisor. 
    
    User Context:
    Current Portfolio:
    ${portfolioSummary}

    Recent Transactions:
    ${recentTx}

    User Query: "${query}"

    Provide a concise, professional, and actionable response (max 100 words). 
    Focus on financial health, risk management, and opportunities based on the provided data.
    If the user asks about gaming funds, be enthusiastic about esports growth.
    If they ask about stocks, be cautious and analytical.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I am currently unable to access the financial networks. Please try again later.";
  }
};
