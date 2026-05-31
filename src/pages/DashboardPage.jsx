import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProgressRing } from '../components/ProgressRing';
import { roadmap, wordOfDayList, studyPlanner } from '../data/lessons';
import { TeacherAvatar } from '../components/TeacherAvatar';

export function DashboardPage({ user, data, progressSummary, logout }) {
  const completedLessons = Object.values(data.progress).filter(Boolean).length;
  const badges = data.badges.length ? data.badges : ['Beginner'];
  const dailyWord = wordOfDayList[new Date().getDate() % wordOfDayList.length];
  const recommendedPlan = studyPlanner.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Добро пожаловать,</p>
          <h1 className="text-4xl font-bold text-rusgray dark:text-white">{user.username}!</h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">Ваш персональный AI-репетитор Алексей готов вести уроки, тестировать вас и отслеживать прогресс.</p>
        </div>
        <button onClick={logout} className="inline-flex items-center rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-rusblue shadow-sm transition hover:bg-slate-100 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
          Выйти
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <div className="space-y-6">
          <TeacherAvatar speaking={false} />
          <div className="glass-card rounded-[28px] border border-white/30 p-6 shadow-glass">
            <h2 className="text-lg font-semibold text-rusgray dark:text-white">Показатели обучения</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Завершено уроков</p>
                <p className="mt-2 text-3xl font-bold text-rusblue">{completedLessons}</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">XP Points</p>
                <p className="mt-2 text-3xl font-bold text-rusblue">{data.xp}</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Текущий уровень</p>
                <p className="mt-2 text-3xl font-bold text-rusblue">{Math.min(1 + Math.floor(data.xp / 200), 10)}</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Сертификаты</p>
                <p className="mt-2 text-3xl font-bold text-rusblue">{data.analytics.certificates || 0}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-[28px] border border-white/30 p-6 shadow-glass">
            <h2 className="text-lg font-semibold text-rusgray dark:text-white">Roadmap Progress</h2>
            <div className="mt-6 space-y-4">
              {roadmap.map((module) => {
                const completed = module.lessons.filter((lesson) => data.progress[lesson.id]).length;
                return (
                  <div key={module.id} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-rusgray dark:text-white">{module.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{completed}/{module.lessons.length} уроков выполнено</p>
                      </div>
                      <span className="rounded-full bg-rusblue/10 px-3 py-1 text-sm font-semibold text-rusblue">{Math.round((completed / module.lessons.length) * 100)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <ProgressRing progress={progressSummary.progress} label="Общий прогресс" />
            <ProgressRing progress={Math.min(data.streak * 10, 100)} label="Стreak" />
            <ProgressRing progress={Math.min(data.analytics.scoreTotal / (data.analytics.sessions || 1), 100)} label="Средний балл" />
          </div>

          <div className="glass-card rounded-[28px] border border-white/30 p-6 shadow-glass">
            <h2 className="text-lg font-semibold text-rusgray dark:text-white">Слово дня</h2>
            <p className="mt-3 text-2xl font-semibold text-rusblue dark:text-white">{dailyWord.word}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{dailyWord.translation} · {dailyWord.transcription}</p>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{dailyWord.example}</p>
          </div>

          <div className="glass-card rounded-[28px] border border-white/30 p-6 shadow-glass">
            <h2 className="text-lg font-semibold text-rusgray dark:text-white">План на сегодня</h2>
            <div className="mt-5 space-y-4">
              {recommendedPlan.map((task) => (
                <div key={task.title} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="text-sm font-semibold text-rusgray dark:text-white">{task.title}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{task.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[28px] border border-white/30 p-6 shadow-glass">
            <h2 className="text-lg font-semibold text-rusgray dark:text-white">Геймификация</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {['Beginner', 'Explorer', 'Communicator', 'Russian Master'].map((badge) => (
                <div key={badge} className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{badge}</p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{data.badges.includes(badge) ? 'Получено' : 'В процессе'}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[28px] border border-white/30 p-6 shadow-glass">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Следующее задание</p>
                <h3 className="mt-1 text-xl font-semibold text-rusgray dark:text-white">Начните урок по алфавиту</h3>
              </div>
              <Link to="/lesson/letters" className="rounded-3xl bg-rusred px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b72c2c]">
                Начать
              </Link>
            </div>
          </div>

          <div className="glass-card rounded-[28px] border border-white/30 p-6 shadow-glass">
            <h2 className="text-lg font-semibold text-rusgray dark:text-white">Быстрые ссылки</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { name: 'AI Tutor', link: '/tutor' },
                { name: 'Словарь', link: '/dictionary' },
                { name: 'Экзамен', link: '/exam' },
                { name: 'Аналитика', link: '/analytics' }
              ].map((item) => (
                <Link key={item.name} to={item.link} className="rounded-3xl bg-slate-100 px-4 py-4 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
