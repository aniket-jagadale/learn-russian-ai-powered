const USER_KEY = 'ruslearn-user';
const DATA_KEY = 'ruslearn-data';
const THEME_KEY = 'ruslearn-theme';

export const storage = {
  saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  loadUser() {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },
  saveAppData(data) {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  },
  loadAppData() {
    const data = localStorage.getItem(DATA_KEY);
    if (data) return JSON.parse(data);
    return {
      progress: {},
      streak: 0,
      xp: 0,
      badges: [],
      leaderboard: [],
      analytics: { lessonsCompleted: 0, scoreTotal: 0, sessions: 0 }
    };
  },
  saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  },
  loadTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }
};
