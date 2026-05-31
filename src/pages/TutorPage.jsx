import { useEffect, useState } from 'react';
import { geminiApi } from '../utils/api';
import { TeacherAvatar } from '../components/TeacherAvatar';

const conversationTemplates = [
  'Объясни мне, как правильно использовать род в русском языке.',
  'Составь короткий диалог для урока в ресторане.',
  'Дай мне вариант упражнения на произношение буквы "ы".',
  'Создай три варианта теста на приветствия.'
];

export function TutorPage({ user }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Спроси меня о русском языке, и я помогу. Я объясню грамматику, дам примеры, упражнения и советы по произношению.' }
  ]);
  const [speaking, setSpeaking] = useState(false);
  const [micSupported, setMicSupported] = useState(false);

  useEffect(() => {
    setMicSupported('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  }, []);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    window.speechSynthesis.speak(utterance);
  };

  const askTutor = async (customPrompt) => {
    const prompt = customPrompt || message;
    if (!prompt) return;

    setMessages((prev) => [...prev, { role: 'user', text: prompt }]);
    setSpeaking(true);

    const result = await geminiApi.chat(prompt).catch(() => ({ answer: 'Ошибка связи с API. Попробуйте позже.' }));
    const text = result.answer || 'Я не получил ответа. Попробуйте задать более конкретный вопрос.';

    setMessages((prev) => [...prev, { role: 'assistant', text }] );
    speakText(text);
    setMessage('');
    setSpeaking(false);
  };

  const startVoicePractice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      askTutor(`Speak in English: ${transcript}. Respond in Russian and add a pronunciation tip.`);
    };
    recognition.onerror = () => setMessages((prev) => [...prev, { role: 'assistant', text: 'Голосовое распознавание недоступно.' }] );
    recognition.start();
  };

  const suggestion = conversationTemplates[Math.floor(Math.random() * conversationTemplates.length)];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card rounded-[32px] border border-white/30 p-8 shadow-glass">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">AI Tutor</p>
              <h1 className="text-4xl font-bold text-rusgray dark:text-white">Алексей объяснит всё</h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">Задайте вопрос на английском или русском, и получите ответ по-русски, примеры, упражнения и советы по произношению.</p>
          <div className="mt-8 space-y-4">
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-600 dark:text-slate-300">Популярный запрос</p>
              <p className="mt-2 text-lg font-semibold text-rusgray dark:text-white">{suggestion}</p>
              <button onClick={() => askTutor(suggestion)} className="mt-4 rounded-3xl bg-rusblue px-5 py-3 text-white transition hover:bg-[#163d79]">Спросить</button>
            </div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Ваш вопрос</label>
            <div className="flex gap-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask in English or Russian..."
                className="min-w-0 flex-1 rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              />
              <button onClick={() => askTutor()} className="rounded-3xl bg-rusred px-5 py-3 text-white transition hover:bg-[#b72c2c]">Ask</button>
            </div>
            {micSupported && (
              <button onClick={startVoicePractice} className="rounded-3xl bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-700">Voice Chat Mode</button>
            )}
            <div className="rounded-3xl bg-slate-100 p-5 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`rounded-3xl p-4 ${msg.role === 'assistant' ? 'bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-200' : 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white'}`}>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                      {msg.role === 'assistant' ? 'Alexei' : 'You'}
                    </p>
                    <p className="mt-2 whitespace-pre-line text-sm leading-6">{msg.text}</p>
                  </div>
                ))}
                {speaking && <div className="rounded-3xl bg-slate-200 p-4 text-slate-700 dark:bg-slate-800 dark:text-slate-300">Alexei is thinking...</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <TeacherAvatar speaking={speaking} />
          <div className="glass-card rounded-[32px] border border-white/30 p-8 shadow-glass">
            <h2 className="text-lg font-semibold text-rusgray dark:text-white">Pronunciation scoring</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">Голосовые практики сравниваются с эталоном, и вы получаете рекомендации по ударению, интонации и звукам.</p>
          </div>
          <div className="glass-card rounded-[32px] border border-white/30 p-8 shadow-glass">
            <h2 className="text-lg font-semibold text-rusgray dark:text-white">Study Planner</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">Alexei может создать персональный план обучения на основе вашего уровня и целей.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
