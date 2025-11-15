import express from 'express';
import { callGemini } from '../services/gemini.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `You are Algebrix, an intelligent AI assistant specialized in:
1. Mathematical problem-solving with step-by-step solutions
2. Web research and information synthesis
3. Logical reasoning and analysis

When solving math problems:
- Show every step clearly
- Display intermediate calculations
- Present the final answer prominently
- Use clear formatting

When answering questions:
- Be concise but thorough
- Cite sources when applicable
- Admit uncertainty when appropriate

IMPORTANT SAFETY RULES:
- NEVER request or handle real account credentials
- NEVER perform login actions or purchases
- Warn users before interacting with authentication-required pages
- Always prioritize user privacy and security`;

    const response = await callGemini(message, history, systemPrompt);

    res.json({
      success: true,
      response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process chat request'
    });
  }
});

export default router;
