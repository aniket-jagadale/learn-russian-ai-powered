import { motion } from 'framer-motion';

export function TeacherAvatar({ speaking }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card relative w-full max-w-sm rounded-[28px] border border-white/30 p-6 shadow-glass"
    >
      <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-rusblue/10 ring-4 ring-white/60" />
      <div className="flex items-center gap-4">
        <div className="relative h-28 w-28 rounded-full bg-gradient-to-br from-rusblue to-rusred p-2 shadow-xl">
          <div className="absolute inset-3 rounded-full bg-white" />
          <div className="absolute left-4 top-6 h-14 w-14 rounded-full bg-[#4172b7]" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">AI Russian Teacher</p>
          <h2 className="text-2xl font-bold text-rusgray dark:text-white">Alexei</h2>
          <p className="text-sm text-slate-500 dark:text-slate-300">Friendly tutor with animated lessons and speech feedback.</p>
        </div>
      </div>
      <div className="mt-5 rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-600 shadow-inner dark:bg-slate-900 dark:text-slate-200">
        <div className="flex items-center gap-3">
          <span className={`inline-block h-3 w-3 rounded-full ${speaking ? 'bg-rusred animate-pulse' : 'bg-emerald-500'}`} />
          {speaking ? 'Listening and explaining...' : 'Ready to help you learn Russian.'}
        </div>
      </div>
    </motion.div>
  );
}
