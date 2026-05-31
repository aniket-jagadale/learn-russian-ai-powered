import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { LessonPage } from './pages/LessonPage';
import { TutorPage } from './pages/TutorPage';
import { ExamPage } from './pages/ExamPage';
import { CertificatePage } from './pages/CertificatePage';
import { DictionaryPage } from './pages/DictionaryPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFound } from './pages/NotFound';
import { storage } from './utils/storage';
import { roadmap } from './data/lessons';

function useAppState() {
  const [user, setUser] = useState(storage.loadUser());
  const [data, setData] = useState(storage.loadAppData());
  const [theme, setTheme] = useState(storage.loadTheme());

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    storage.saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    storage.saveAppData(data);
  }, [data]);

  useEffect(() => {
    if (user) storage.saveUser(user);
  }, [user]);

  const progressSummary = useMemo(() => {
    const totalLessons = roadmap.reduce((sum, module) => sum + module.lessons.length, 0);
    const completed = Object.values(data.progress).filter(Boolean).length;
    return {
      completed,
      totalLessons,
      progress: totalLessons === 0 ? 0 : Math.round((completed / totalLessons) * 100)
    };
  }, [data.progress]);

  return { user, setUser, data, setData, theme, setTheme, progressSummary };
}

export default function App() {
  const navigate = useNavigate();
  const { user, setUser, data, setData, theme, setTheme, progressSummary } = useAppState();

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const requireAuth = (element) => (user ? element : <Navigate to="/login" replace />);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-gray-100 dark:from-[#090b12] dark:via-[#0f172a] dark:to-[#111827] pb-20">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/register" element={<RegisterPage onRegister={setUser} />} />
        <Route path="/dashboard" element={requireAuth(<DashboardPage user={user} data={data} progressSummary={progressSummary} logout={logout} />)} />
        <Route path="/lesson/:lessonId" element={requireAuth(<LessonPage data={data} setData={setData} />)} />
        <Route path="/tutor" element={requireAuth(<TutorPage user={user} />)} />
        <Route path="/exam" element={requireAuth(<ExamPage user={user} data={data} setData={setData} />)} />
        <Route path="/certificate" element={requireAuth(<CertificatePage user={user} data={data} />)} />
        <Route path="/dictionary" element={requireAuth(<DictionaryPage />)} />
        <Route path="/analytics" element={requireAuth(<AnalyticsPage data={data} />)} />
        <Route path="/settings" element={requireAuth(<SettingsPage theme={theme} setTheme={setTheme} logout={logout} />)} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
