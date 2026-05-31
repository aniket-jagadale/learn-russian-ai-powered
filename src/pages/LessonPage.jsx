import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { roadmap, lessonContent } from '../data/lessons';

export function LessonPage({ data, setData }) {
  const { lessonId } = useParams();
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const lesson = useMemo(() => {
    const moduleLesson = roadmap.flatMap((module) => module.lessons).find((item) => item.id === lessonId);
    return { ...lessonContent[lessonId], ...moduleLesson };
  }, [lessonId]);

  useEffect(() => {
    if (!lesson) return;
    setFeedback('');
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-center text-slate-600 dark:text-slate-300">
        <h2 className="text-3xl font-bold text-rusgray dark:text-white">Урок не найден</h2>
        <p className="mt-3">Пожалуйста, выберите другой урок на панели управления.</p>
        <Link className="mt-6 inline-flex rounded-3xl bg-rusblue px-5 py-3 text-white" to="/dashboard">Вернуться на панель</Link>
      </div>
    );
  }

  const handleComplete = () => {
    const updated = { ...data.progress, [lessonId]: true };
    const newXp = (data.xp || 0) + 30;
    const badgeList = new Set(data.badges || []);
    if (newXp >= 300) badgeList.add('Russian Master');
    else if (newXp >= 200) badgeList.add('Communicator');
    else if (newXp >= 100) badgeList.add('Explorer');
    else badgeList.add('Beginner');

    setData({
      ...data,
      progress: updated,
      xp: newXp,
      badges: Array.from(badgeList),
      analytics: {
        ...data.analytics,
        lessonsCompleted: (data.analytics.lessonsCompleted || 0) + 1,
        timeSpent: (data.analytics.timeSpent || 0) + 5
      }
    });
    setFeedback('Урок отмечен как завершённый! XP начислен.');
  };

  const checkAnswer = () => {
    const target = lesson.exercises?.[0]?.answer?.toLowerCase?.();
    if (target && answer.trim().toLowerCase() === target) {
      setFeedback('Верно! Отличная работа.');
    } else {
      setFeedback('Проверьте свой ответ и попробуйте еще раз.');
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 rounded-[32px] bg-white p-8 shadow-xl dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Урок</p>
            <h1 className="text-4xl font-bold text-rusgray dark:text-white">{lesson.title}</h1>
          </div>
          <Link to="/dashboard" className="rounded-3xl bg-rusblue px-5 py-3 text-white transition hover:bg-[#163d79]">К панели</Link>
        </div>
        <p className="max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">{lesson.content || 'Изучайте материал, выполняйте упражнения, и продвигайтесь по курсу.'}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="glass-card rounded-[32px] border border-white/30 p-8 shadow-glass">
            <h2 className="text-xl font-semibold text-rusgray dark:text-white">Интерактивное упражнение</h2>
            <ul className="mt-5 space-y-4 text-slate-600 dark:text-slate-300">
              {lesson.exercises?.map((exercise, index) => (
                <li key={index} className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
                  <p className="font-semibold text-slate-800 dark:text-white">{exercise.question}</p>
                  <div className="mt-3">
                    {exercise.type === 'mcq' && exercise.options?.map((option) => (
                      <button
                        key={option}
                        onClick={() => setAnswer(option)}
                        className={`mr-2 mb-2 rounded-3xl border px-4 py-2 text-sm transition ${answer === option ? 'border-rusblue bg-rusblue/10 text-rusblue' : 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'}`}
                      >
                        {option}
                      </button>
                    ))}
                    {exercise.type === 'fill' && (
                      <input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Введите ответ"
                        className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button onClick={checkAnswer} className="rounded-3xl bg-rusblue px-5 py-3 text-white transition hover:bg-[#163d79]">Проверить ответ</button>
              <button onClick={handleComplete} className="rounded-3xl bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-700">Отметить как завершено</button>
            </div>
            {feedback && <p className="mt-4 rounded-3xl bg-slate-100 px-4 py-3 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{feedback}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
