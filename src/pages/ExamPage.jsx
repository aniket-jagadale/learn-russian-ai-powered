import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roadmap } from '../data/lessons';

const examQuestions = Array.from({ length: 50 }, (_, index) => ({
  id: `q${index + 1}`,
  question: `Выберите правильный перевод предложения ${index + 1}.`,
  options: ['Да', 'Нет', 'Привет', 'Спасибо', 'Пожалуйста', 'До свидания'],
  answer: index % 3 === 0 ? 'Привет' : index % 3 === 1 ? 'Спасибо' : 'До свидания'
}));

export function ExamPage({ user, data, setData }) {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && !submitted) {
      submitExam();
    }
  }, [timeLeft]);

  const completedModules = roadmap.every((module) => module.lessons.every((lesson) => data.progress[lesson.id]));

  const submitExam = () => {
    const earned = examQuestions.reduce((sum, question) => (answers[question.id] === question.answer ? sum + 2 : sum), 0);
    const updatedAnalytics = {
      ...data.analytics,
      scoreTotal: (data.analytics.scoreTotal || 0) + earned,
      sessions: (data.analytics.sessions || 0) + 1
    };
    setData({ ...data, analytics: updatedAnalytics, certificates: updatedAnalytics.certificates || 0 });
    setScore(earned);
    setSubmitted(true);
    if (earned >= 50) {
      setData({ ...data, analytics: { ...updatedAnalytics, certificates: (updatedAnalytics.certificates || 0) + 1 } });
    }
  };

  const formateTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!completedModules) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-center text-slate-600 dark:text-slate-300">
        <h2 className="text-3xl font-bold text-rusgray dark:text-white">Экзамен пока недоступен</h2>
        <p className="mt-3">Завершите все модули, чтобы открыть финальный экзамен.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 rounded-[32px] bg-white p-8 shadow-xl dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Финальный экзамен</p>
            <h1 className="text-4xl font-bold text-rusgray dark:text-white">100 marks · 50 вопросов</h1>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-3 text-slate-700 dark:bg-slate-950 dark:text-slate-200">Осталось: {formateTime(timeLeft)}</div>
        </div>
        <p className="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">Отвечайте на вопросы тщательно. Каждое правильное решение — 2 балла. Экзамен автоматически отправится, когда таймер истечёт.</p>
      </div>

      {!submitted ? (
        <div className="space-y-6">
          {examQuestions.map((question) => (
            <div key={question.id} className="rounded-[28px] bg-white p-6 shadow-xl dark:bg-slate-900">
              <p className="font-semibold text-slate-800 dark:text-white">{question.question}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, [question.id]: option })}
                    className={`rounded-3xl border px-4 py-3 text-left transition ${answers[question.id] === option ? 'border-rusblue bg-rusblue/10 text-rusblue' : 'border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={submitExam} className="rounded-3xl bg-rusred px-6 py-4 text-lg font-semibold text-white transition hover:bg-[#b72c2c]">Отправить экзамен</button>
        </div>
      ) : (
        <div className="rounded-[32px] bg-white p-8 shadow-xl dark:bg-slate-900">
          <h2 className="text-3xl font-bold text-rusgray dark:text-white">Результат</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Счет: {score} / 100</p>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">Процент: {Math.round((score / 100) * 100)}%</p>
          <p className={`mt-4 rounded-3xl px-5 py-4 text-lg font-semibold ${score >= 50 ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/10 dark:text-emerald-200' : 'bg-rusred/10 text-rusred dark:bg-rusred/10 dark:text-rusred'}`}>
            {score >= 50 ? 'Прошел' : 'Не прошел'}
          </p>
          {score >= 50 && (
            <button onClick={() => navigate('/certificate')} className="mt-6 rounded-3xl bg-rusblue px-6 py-4 text-white transition hover:bg-[#163d79]">Получить сертификат</button>
          )}
        </div>
      )}
    </div>
  );
}
