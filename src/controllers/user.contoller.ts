import { Response, Request } from "express";
import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""; // Store API key in env for security

// Utility function to call Gemini API
async function fetchGeminiResponse(prompt: string): Promise<string> {
    try {
        const geminiRequest = {
            contents: [{ parts: [{ text: prompt }] }]
        };

        const geminiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            geminiRequest,
            { headers: { "Content-Type": "application/json" } }
        );

        interface GeminiResponse {
            candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
        }

        const geminiData = geminiResponse.data as GeminiResponse;
        return geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
    } catch (error) {
        console.error("Error fetching response from Gemini API:", error);
        throw new Error("Failed to process request.");
    }
}

// Endpoint 1: What the user should do in this situation
export async function userGuidance(req: Request, res: Response): Promise<void> {
    try {
        const input = req.body;
        if (!input || !input.type) {
            res.status(400).json({ error: "Invalid input. 'type' is required." });
            return;
        }

        const questionsAndAnswers = [];
        for (let i = 1; i <= 9; i++) {
            const question = input[`q${i}`];
            if (question && question.q && question.a) {
                questionsAndAnswers.push(`Q${i}: ${question.q} | A${i}: ${question.a}`);
            }
        }

const prompt = `A person in Bengaluru, India, is facing a situation related to "${input.type}". Here are their questions and answers:\n\n${questionsAndAnswers.join("\n")}\n\nProvide clear and cautious guidance on what the person should do in this situation, based solely on their legal rights under Indian law as applicable in Bengaluru. Also let the response be tailored to bengaluru public based on what they face Ensure the response avoids speculation, remains strictly within the scope of established legal principles, and advises consulting a qualified legal professional for personalized advice. don't say based on bengaluru or india, just give direct response. and be minimalist.`;        const geminiResponse = await fetchGeminiResponse(prompt);

        res.status(200).json({ message: "Success", userGuidance: geminiResponse });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// Endpoint 2: What police are supposed to do
export async function policeProtocol(req: Request, res: Response): Promise<void> {
    try {
        const input = req.body;
        if (!input || !input.type) {
            res.status(400).json({ error: "Invalid input. 'type' is required." });
            return;
        }

        const questionsAndAnswers = [];
        for (let i = 1; i <= 9; i++) {
            const question = input[`q${i}`];
            if (question && question.q && question.a) {
                questionsAndAnswers.push(`Q${i}: ${question.q} | A${i}: ${question.a}`);
            }
        }

        const prompt = `A police officer is handling a case related to "${input.type}". Below are relevant questions and answers about the situation:

        \n\n${questionsAndAnswers.join("\n")}\n\n
        
        Outline the exact legal procedures police must follow under Indian law, referencing only the Indian Constitution and applicable statutes. Focus solely on police responsibilities and legal obligations—exclude any guidance for the user. Keep the response concise, direct, and strictly legal, with no mention of location or interpretations beyond the law.`;
        
        const geminiResponse = await fetchGeminiResponse(prompt);

        res.status(200).json({ message: "Success", policeProtocol: geminiResponse });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
