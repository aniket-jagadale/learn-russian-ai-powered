import { useMemo } from 'react';

export function AnalyticsPage({ data }) {
  const averageScore = useMemo(() => {
    const sessions = data.analytics.sessions || 1;
    return Math.round((data.analytics.scoreTotal || 0) / sessions);
  }, [data.analytics]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="glass-card rounded-[32px] border border-white/30 p-8 shadow-glass">
        <h1 className="text-4xl font-bold text-rusgray dark:text-white">Локальная аналитика</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-300">Отслеживайте прогресс, время обучения и коллекцию сертификатов.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Уроки</p>
            <p className="mt-3 text-3xl font-semibold text-rusblue">{data.analytics.lessonsCompleted || 0}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Средний балл</p>
            <p className="mt-3 text-3xl font-semibold text-rusblue">{averageScore}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Время</p>
            <p className="mt-3 text-3xl font-semibold text-rusblue">{data.analytics.timeSpent || 0} мин</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Сертификаты</p>
            <p className="mt-3 text-3xl font-semibold text-rusblue">{data.analytics.certificates || 0}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-[32px] bg-white p-8 shadow-xl dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-rusgray dark:text-white">Тенденции обучения</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Проследите, как растет ваш опыт, как изменяются результаты и какие достижения вы получили по ходу курса.</p>
        </div>
        <div className="rounded-[32px] bg-slate-50 p-8 shadow-xl dark:bg-slate-950">
          <h2 className="text-2xl font-semibold text-rusgray dark:text-white">Лидерборд</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Список локальных достижений внутри вашего браузера.</p>
          <ul className="mt-6 space-y-3 text-slate-700 dark:text-slate-200">
            <li className="rounded-3xl bg-white p-4 dark:bg-slate-800">1. {data.badges[0] || 'Beginner'} — {data.xp || 0} XP</li>
            <li className="rounded-3xl bg-white p-4 dark:bg-slate-800">2. Explorer — 120 XP</li>
            <li className="rounded-3xl bg-white p-4 dark:bg-slate-800">3. Communicator — 98 XP</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
