import { useMemo, useState } from 'react';
import dictionary from '../data/dictionary.json';

export function DictionaryPage() {
  const [query, setQuery] = useState('');
  const matches = useMemo(() => {
    if (!query) return dictionary.slice(0, 18);
    return dictionary.filter((item) =>
      item.word.toLowerCase().includes(query.toLowerCase()) ||
      item.translation.toLowerCase().includes(query.toLowerCase()) ||
      item.partOfSpeech?.toLowerCase().includes(query.toLowerCase()) ||
      item.synonyms?.some((syn) => syn.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="glass-card rounded-[32px] border border-white/30 p-8 shadow-glass">
        <h1 className="text-4xl font-bold text-rusgray dark:text-white">Русский словарь</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-300">Оффлайн поиск слов, перевод, часть речи, синонимы и примеры использования.</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск слова, перевода или части речи"
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
          />
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {matches.map((item) => (
          <div key={item.word} className="rounded-[28px] bg-white p-6 shadow-xl dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-rusblue">{item.word}</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.partOfSpeech}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">{item.transcription}</span>
            </div>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">{item.translation}</p>
            {item.synonyms?.length > 0 && (
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                Синонимы: {item.synonyms.join(', ')}
              </p>
            )}
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.example}</p>
            {item.notes && <p className="mt-4 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-300">{item.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
