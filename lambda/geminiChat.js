import fetch from 'node-fetch';

const API_URL = process.env.GEMINI_API_URL || 'https://gemini.googleapis.com/v1/assistants/chat:complete';
const API_KEY = process.env.GEMINI_API_KEY;

export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body || '{}');
    if (!message || !API_KEY) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request or missing API key.' }) };
    }

    const prompt = `You are Alexei, a friendly Russian teacher. Answer in Russian, provide examples, pronunciation tips, quizzes, and encourage the learner.`;
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: `${prompt}\nUser: ${message}`
      })
    });
    const result = await response.json();
    const answer = result?.candidates?.[0]?.output || result?.output?.[0]?.content || 'Извините, сейчас я не могу ответить.';
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' },
      body: JSON.stringify({ answer })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
