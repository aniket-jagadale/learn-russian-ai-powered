import fetch from 'node-fetch';

const API_URL = process.env.GEMINI_API_URL || 'https://gemini.googleapis.com/v1/assistants/chat:complete';
const API_KEY = process.env.GEMINI_API_KEY;

export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body || '{}');
    if (!prompt || !API_KEY) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Request requires prompt and API key.' }) };
    }
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `Generate a Russian quiz based on: ${prompt}` })
    });
    const result = await response.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' },
      body: JSON.stringify({ quiz: result?.candidates?.[0]?.output || 'Unable to generate quiz at the moment.' })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
