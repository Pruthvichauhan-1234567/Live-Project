import React from 'react';

export const CardSkeleton = () => (
  <div className="glass-panel rounded-3xl p-6 h-full min-h-[200px] flex flex-col justify-between skeleton-pulse">
    <div className="h-4 w-28 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
    <div className="space-y-2.5 my-4">
      <div className="h-8 w-20 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
      <div className="h-4 w-36 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
    </div>
    <div className="h-3 w-full bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
  </div>
);

export const CurrentWeatherSkeleton = () => (
  <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md skeleton-pulse">
    <div className="space-y-4 w-full md:w-auto">
      <div className="h-5 w-40 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
      <div className="h-14 w-28 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
      <div className="h-4 w-48 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
      <div className="h-3.5 w-32 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
    </div>
    <div className="h-32 w-32 md:h-40 md:w-40 rounded-2xl bg-slate-200/50 dark:bg-slate-800/80 shrink-0"></div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="glass-panel rounded-3xl p-6 h-[380px] flex flex-col justify-between skeleton-pulse">
    <div className="flex justify-between items-center mb-6">
      <div className="space-y-1.5">
        <div className="h-5 w-32 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
        <div className="h-3.5 w-48 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
      </div>
      <div className="h-9 w-60 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
    </div>
    <div className="flex-1 w-full bg-slate-200/30 dark:bg-slate-800/40 rounded-2xl mb-4"></div>
    <div className="h-3 w-full bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
  </div>
);

export const ForecastSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3, 4, 5].map((idx) => (
      <div key={idx} className="glass-panel rounded-2xl p-4 flex items-center justify-between gap-4 skeleton-pulse">
        <div className="h-4 w-20 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
        <div className="h-8 w-8 bg-slate-200/50 dark:bg-slate-800/80 rounded-full"></div>
        <div className="h-4 w-24 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
        <div className="h-4 w-12 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg"></div>
      </div>
    ))}
  </div>
);

const Skeletons = {
  CardSkeleton,
  CurrentWeatherSkeleton,
  ChartSkeleton,
  ForecastSkeleton
};

export default Skeletons;
