import { Link } from 'react-router-dom';

export function SettingsPage({ theme, setTheme, logout }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="glass-card rounded-[32px] border border-white/30 p-8 shadow-glass">
        <h1 className="text-4xl font-bold text-rusgray dark:text-white">Настройки</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-300">Управляйте темой, локальными данными и персональным опытом.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] bg-white p-6 shadow-xl dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Тема</p>
            <div className="mt-4 flex items-center gap-4">
              <button onClick={() => setTheme('light')} className={`rounded-3xl px-4 py-3 ${theme === 'light' ? 'bg-rusblue text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>Светлая</button>
              <button onClick={() => setTheme('dark')} className={`rounded-3xl px-4 py-3 ${theme === 'dark' ? 'bg-rusblue text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>Тёмная</button>
            </div>
          </div>
          <div className="rounded-[28px] bg-white p-6 shadow-xl dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Системные действия</p>
            <div className="mt-4 space-y-3">
              <button onClick={logout} className="w-full rounded-3xl bg-rusred px-4 py-3 text-white transition hover:bg-[#b72c2c]">Выйти</button>
              <Link to="/dashboard" className="inline-flex w-full justify-center rounded-3xl bg-slate-100 px-4 py-3 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Назад к панели</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
