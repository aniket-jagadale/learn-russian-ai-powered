import fetch from 'node-fetch';

const API_URL = process.env.GEMINI_API_URL || 'https://gemini.googleapis.com/v1/assistants/chat:complete';
const API_KEY = process.env.GEMINI_API_KEY;

export async function handler(event) {
  try {
    const { text } = JSON.parse(event.body || '{}');
    if (!text || !API_KEY) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Request requires text and API key.' }) };
    }
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `Proofread and correct this Russian text. Offer a short explanation: ${text}` })
    });
    const result = await response.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' },
      body: JSON.stringify({ correction: result?.candidates?.[0]?.output || 'Unable to correct text at the moment.' })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
