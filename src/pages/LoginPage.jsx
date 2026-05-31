import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';

export function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = storage.loadUser();
    if (!user) {
      setError('Нет зарегистрированных пользователей. Пожалуйста, зарегистрируйтесь.');
      return;
    }
    if (username === user.username && password === user.password) {
      onLogin(user);
      navigate('/dashboard');
    } else {
      setError('Неверное имя пользователя или пароль. Попробуйте снова.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="glass-card max-w-md rounded-[32px] border border-white/30 p-8 shadow-glass">
        <h1 className="text-3xl font-bold text-rusgray dark:text-white">RusLearn AI</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-300">Войдите, чтобы продолжить обучение русскому языку.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Имя пользователя</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-rusblue"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-rusblue"
              required
            />
          </div>
          {error && <div className="rounded-3xl bg-rusred/10 px-4 py-3 text-sm text-rusred">{error}</div>}
          <button className="w-full rounded-3xl bg-rusblue px-5 py-3 text-white transition hover:bg-[#163d79]" type="submit">
            Войти
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-500 dark:text-slate-300">
          Нет аккаунта?{' '}
          <Link className="font-semibold text-rusblue hover:underline" to="/register">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}
