import React from 'react';

export function ProgressRing({ progress, label, className }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={className || 'flex flex-col items-center text-center'}>
      <svg width="120" height="120" className="transform -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="rgba(31,75,143,0.12)"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#1f4b8f"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="-mt-20 text-2xl font-semibold text-rusgray dark:text-white">{progress}%</div>
      <div className="mt-1 text-sm text-slate-500 dark:text-slate-300">{label}</div>
    </div>
  );
}
