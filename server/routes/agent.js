import express from 'express';
import { searchWeb } from '../services/gemini.js';
import { extractPageContent } from '../services/playwright.js';
import { generateCSV } from '../services/csv.js';
import { rateLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/', rateLimiter, async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const searchResults = await searchWeb(topic);

    const top5URLs = searchResults.slice(0, 5).map(r => r.url);

    const extractedData = [];

    for (const url of top5URLs) {
      try {
        const data = await extractPageContent(url);
        extractedData.push(data);
      } catch (error) {
        console.error(`Failed to extract ${url}:`, error.message);
        extractedData.push({
          url,
          title: 'Failed to extract',
          excerpt: 'Page content unavailable'
        });
      }
    }

    const timestamp = Date.now();
    const csvPath = await generateCSV(extractedData, timestamp);

    const summary = await generateSummary(topic, extractedData);

    res.json({
      success: true,
      summary,
      results: extractedData,
      csvUrl: `/api/download?file=${timestamp}-results.csv`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Agent error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process agent request'
    });
  }
});

async function generateSummary(topic, results) {
  const validResults = results.filter(r => r.title !== 'Failed to extract');

  if (validResults.length === 0) {
    return `Unable to extract meaningful content for "${topic}". All pages failed to load or were inaccessible. Confidence: Low.`;
  }

  const excerpts = validResults.map(r => `${r.title}: ${r.excerpt}`).join('\n');

  const summaryPrompt = `Based on these web search results for "${topic}", provide a concise 3-5 sentence summary that synthesizes the key findings. End with a one-line confidence assessment.

Results:
${excerpts}`;

  try {
    const { callGemini } = await import('../services/gemini.js');
    const summary = await callGemini(summaryPrompt, [], 'You are a research assistant. Provide concise, accurate summaries.');
    return summary;
  } catch (error) {
    return `Found ${validResults.length} relevant results about ${topic}. ${validResults[0].excerpt.substring(0, 200)}... Confidence: Medium.`;
  }
}

export default router;
