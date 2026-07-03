import React from 'react';
import { Eye } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const VisibilityCard = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { visibility } = weatherData.current;

  // Classify visibility range
  const getVisibilityLabel = (vis) => {
    if (vis >= 10) return 'Perfectly clear view.';
    if (vis >= 7) return 'Good visibility, minor dust.';
    if (vis >= 4) return 'Moderate haze, typical city air.';
    return 'Low visibility, caution advised.';
  };

  const label = getVisibilityLabel(visibility);

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-md flex flex-col justify-between h-full min-h-[220px]">
      <span className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2">
        <Eye className="h-4.5 w-4.5 text-blue-500" />
        Visibility
      </span>

      <div className="flex items-center justify-between my-2 gap-4">
        <div>
          <span className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-slate-805 dark:text-white block">
            {visibility} <span className="text-sm font-medium text-slate-450">km</span>
          </span>
          <span className="text-xs font-semibold text-slate-550 dark:text-slate-400 block mt-1">
            Standard maximum is 10 km
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 shrink-0">
          <Eye className="h-8 w-8" />
        </div>
      </div>

      <p className="text-[10px] font-medium text-slate-450 leading-relaxed border-t border-slate-200/35 dark:border-slate-800/25 pt-3 mt-1">
        {label} Fog, heavy rainfall, or severe pollution decrease visibility ranges.
      </p>
    </div>
  );
};

export default VisibilityCard;
