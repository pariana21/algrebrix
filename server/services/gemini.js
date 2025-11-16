
import dotenv from 'dotenv';
dotenv.config();

const HF_API_KEY = process.env.HF_API_KEY;

if (!HF_API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY_FREE not found in environment variables');
}

export async function callGemini(message, history = [], systemPrompt = '') {
  if (!HF_API_KEY) {
    throw new Error('GEMINI_API_KEY_FREE environment variable is not set. Please add it to your .env file.');
  }

  const url = 'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M';

  let conversationText = '';
  
  if (systemPrompt) {
    conversationText += `${systemPrompt}\n\n`;
  }

  for (const msg of history) {
    conversationText += `${msg.role}: ${msg.content}\n`;
  }

  conversationText += `user: ${message}\nassistant:`;

  const payload = {
    inputs: conversationText,
    parameters: {
      max_new_tokens: 512,
      temperature: 0.7,
      top_p: 0.95,
      return_full_text: false
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Hugging Face API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
  }

  const data = await response.json();

  if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
    return data[0].generated_text.trim();
  }

  throw new Error('No response from Hugging Face API');
}

export async function searchWeb(topic) {
  const searchPrompt = `Generate a JSON array of the top 10 most relevant URLs for: "${topic}"

Format:
[
  {
    "url": "https://example.com",
    "relevance": "High",
    "description": "Brief description"
  }
]

Return ONLY valid JSON, no other text.`;

  try {
    const response = await callGemini(searchPrompt, [], 'You are a web search assistant. Return only valid JSON arrays of search results.');

    let jsonText = response.trim();
    const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    const results = JSON.parse(jsonText);

    if (!Array.isArray(results)) {
      throw new Error('Invalid search results format');
    }

    return results.slice(0, 10);

  } catch (error) {
    console.error('Search error:', error);
    return [
      { url: `https://www.google.com/search?q=${encodeURIComponent(topic)}`, relevance: 'High', description: 'Google search results' },
      { url: `https://en.wikipedia.org/wiki/${encodeURIComponent(topic.replace(/\s+/g, '_'))}`, relevance: 'High', description: 'Wikipedia article' },
      { url: `https://www.reddit.com/search/?q=${encodeURIComponent(topic)}`, relevance: 'Medium', description: 'Reddit discussions' },
      { url: `https://stackoverflow.com/search?q=${encodeURIComponent(topic)}`, relevance: 'Medium', description: 'Stack Overflow questions' },
      { url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`, relevance: 'Medium', description: 'YouTube videos' }
    ];
  }
}
