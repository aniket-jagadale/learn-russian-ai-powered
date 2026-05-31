import http from 'http';
import { readFile, stat } from 'fs/promises';
import path from 'path';
import { URL } from 'url';
import { handler as geminiChatHandler } from './lambda/geminiChat.js';
import { handler as quizGeneratorHandler } from './lambda/quizGenerator.js';
import { handler as grammarCorrectionHandler } from './lambda/grammarCorrection.js';
import { handler as certificateValidationHandler } from './lambda/certificateValidation.js';

const port = Number(process.env.PORT || 3000);
const distDir = path.resolve(process.cwd(), 'dist');
const mimeTypes = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  json: 'application/json',
  svg: 'image/svg+xml',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  txt: 'text/plain',
  wasm: 'application/wasm',
  map: 'application/json',
  xml: 'application/xml',
  webmanifest: 'application/manifest+json',
  woff: 'font/woff',
  woff2: 'font/woff2',
  ttf: 'font/ttf',
  eot: 'application/vnd.ms-fontobject'
};

const routes = new Map([
  ['/gemini-chat', geminiChatHandler],
  ['/quiz-generator', quizGeneratorHandler],
  ['/grammar-correction', grammarCorrectionHandler],
  ['/certificate-validate', certificateValidationHandler]
]);

const parseBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', (chunk) => { body += chunk.toString(); });
  req.on('end', () => resolve(body));
  req.on('error', reject);
});

const serveFile = async (filePath, res) => {
  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      return serveFile(path.join(filePath, 'index.html'), res);
    }
    const ext = path.extname(filePath).slice(1).toLowerCase();
    const content = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(content);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
};

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = requestUrl.pathname;
  const handler = routes.get(pathname);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (handler && req.method === 'POST') {
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
    return;
  }

  const assetPath = pathname === '/' ? 'index.html' : pathname.slice(1);
  const filePath = path.join(distDir, assetPath);
  await serveFile(filePath, res);
});

server.listen(port, () => {
  console.log(`RusLearn AI server running on http://localhost:${port}`);
});