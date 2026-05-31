import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';

export function RegisterPage({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password || !confirm) {
      setError('Заполните все поля.');
      return;
    }
    if (password !== confirm) {
      setError('Пароли не совпадают.');
      return;
    }
    const user = { username, password, registeredAt: new Date().toISOString() };
    storage.saveUser(user);
    onRegister(user);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="glass-card max-w-md rounded-[32px] border border-white/30 p-8 shadow-glass">
        <h1 className="text-3xl font-bold text-rusgray dark:text-white">Создать аккаунт</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-300">Создайте локальный профиль для вашего обучения.</p>
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
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Подтвердите пароль</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-rusblue"
              required
            />
          </div>
          {error && <div className="rounded-3xl bg-rusred/10 px-4 py-3 text-sm text-rusred">{error}</div>}
          <button className="w-full rounded-3xl bg-rusblue px-5 py-3 text-white transition hover:bg-[#163d79]" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-500 dark:text-slate-300">
          Уже есть аккаунт?{' '}
          <Link className="font-semibold text-rusblue hover:underline" to="/login">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
