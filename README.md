<<<<<<< HEAD
# learn-russian-ai-powered
=======
# RusLearn AI

RusLearn AI is a premium Russian language learning web app built with React, Tailwind CSS, Framer Motion, and a Node-powered Gemini AI backend.

## Features

- User registration and login stored locally
- Animated AI teacher with voice and gesture interactions
- Learning roadmap from Alphabet to Advanced Russian
- Interactive exercises with quizzes, flashcards, listening, and drag-and-drop
- Final exam with auto submit, scoring, certificate generation, and QR verification
- Local progress tracking, achievements, leaderboard, and analytics
- Dark mode, offline PWA support, pronunciation practice
- Node-powered Gemini AI backend for single-server deployment

## Getting Started

1. Install dependencies:

```powershell
npm install
```

2. Run development server:

```powershell
npm run dev
```

3. Build for production:

```powershell
npm run build
```

## Run on EC2 with Node

This repo can run on a single EC2 instance using Node.js. The server serves the built frontend and handles API requests through the existing `lambda` handlers.

### Install and build

```bash
npm install
cd lambda
npm install
cd ..
npm run build
```

### Start the server

Set the Gemini API key and start the app:

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
node server.js
```

To change the listening port:

```bash
export PORT=4000
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
node server.js
```

Then open in your browser:

```text
http://<EC2_PUBLIC_IP>:3000
```

### Notes

- The frontend and backend share the same host, so no additional API base URL is needed.
- `GEMINI_API_URL` can be set if you need a custom Gemini endpoint.
- For production, run `node server.js` under a process manager such as `pm2` or `systemd`.

## Notes

- No cloud database is required.
- All user progress is stored locally in `localStorage`.
- The Gemini API key is never stored in frontend code.
>>>>>>> c8012b6 (adding 2)
