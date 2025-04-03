"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGuidance = userGuidance;
exports.policeProtocol = policeProtocol;
const axios_1 = __importDefault(require("axios"));
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""; // Store API key in env for security
// Utility function to call Gemini API
function fetchGeminiResponse(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const geminiRequest = {
                contents: [{ parts: [{ text: prompt }] }]
            };
            const geminiResponse = yield axios_1.default.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, geminiRequest, { headers: { "Content-Type": "application/json" } });
            const geminiData = geminiResponse.data;
            return ((_e = (_d = (_c = (_b = (_a = geminiData.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) || "No response from Gemini.";
        }
        catch (error) {
            console.error("Error fetching response from Gemini API:", error);
            throw new Error("Failed to process request.");
        }
    });
}
// Endpoint 1: What the user should do in this situation
function userGuidance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const prompt = `A person in Bengaluru, India, is facing a situation related to "${input.type}". Here are their questions and answers:\n\n${questionsAndAnswers.join("\n")}\n\nProvide clear and cautious guidance on what the person should do in this situation, based solely on their legal rights under Indian law as applicable in Bengaluru. Also let the response be tailored to bengaluru public based on what they face Ensure the response avoids speculation, remains strictly within the scope of established legal principles, and advises consulting a qualified legal professional for personalized advice. don't say based on bengaluru or india, just give direct response. and be minimalist.`;
            const geminiResponse = yield fetchGeminiResponse(prompt);
            res.status(200).json({ message: "Success", userGuidance: geminiResponse });
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    });
}
// Endpoint 2: What police are supposed to do
function policeProtocol(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const geminiResponse = yield fetchGeminiResponse(prompt);
            res.status(200).json({ message: "Success", policeProtocol: geminiResponse });
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    });
}
