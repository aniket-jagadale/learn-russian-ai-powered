const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return response.json();
}

export const geminiApi = {
  chat(message) {
    return request('/gemini-chat', { message });
  },
  quiz(prompt) {
    return request('/quiz-generator', { prompt });
  },
  grammar(text) {
    return request('/grammar-correction', { text });
  },
  validateCertificate(data) {
    return request('/certificate-validate', data);
  }
};
