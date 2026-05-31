import http from 'http';
import { URL } from 'url';
import { handler as geminiChatHandler } from './geminiChat.js';
import { handler as quizGeneratorHandler } from './quizGenerator.js';
import { handler as grammarCorrectionHandler } from './grammarCorrection.js';
import { handler as certificateValidationHandler } from './certificateValidation.js';

const port = process.env.PORT || 3000;
const routes = new Map([
  ['/gemini-chat', geminiChatHandler],
  ['/quiz-generator', quizGeneratorHandler],
  ['/grammar-correction', grammarCorrectionHandler],
  ['/certificate-validate', certificateValidationHandler]
]);

const parseBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => resolve(body));
  req.on('error', reject);
});

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const handler = routes.get(requestUrl.pathname);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (!handler || req.method !== 'POST') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Not found.' }));
  }

  try {
    const body = await parseBody(req);
    const event = { body };
    const result = await handler(event);
    res.writeHead(result.statusCode || 200, { 'Content-Type': 'application/json' });
    res.end(result.body || JSON.stringify(result));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(port, () => {
  console.log(`AI backend server listening on http://localhost:${port}`);
});
