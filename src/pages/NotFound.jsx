import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 text-center">
      <div className="glass-card rounded-[32px] border border-white/30 p-10 shadow-glass">
        <h1 className="text-5xl font-bold text-rusblue">404</h1>
        <p className="mt-4 text-xl text-slate-600 dark:text-slate-300">Страница не найдена.</p>
        <Link className="mt-6 inline-flex rounded-3xl bg-rusred px-5 py-3 text-white transition hover:bg-[#b72c2c]" to="/dashboard">Вернуться на панель</Link>
      </div>
    </div>
  );
}
