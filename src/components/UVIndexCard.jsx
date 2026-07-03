import React from 'react';
import { Sun } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const UVIndexCard = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { uvIndex } = weatherData.current;

  // Classify risk level based on standard index guidelines
  const getUvLevel = (uv) => {
    if (uv <= 2) return { text: 'Low', color: 'text-emerald-500', desc: 'No protection required.' };
    if (uv <= 5) return { text: 'Moderate', color: 'text-amber-500', desc: 'SPF 15+ recommended.' };
    if (uv <= 7) return { text: 'High', color: 'text-orange-500', desc: 'Hat + sunglasses needed.' };
    if (uv <= 10) return { text: 'Very High', color: 'text-rose-500', desc: 'Limit midday sun.' };
    return { text: 'Extreme', color: 'text-purple-500', desc: 'Avoid sun exposure.' };
  };

  const uvLevel = getUvLevel(uvIndex);
  const fillPercent = Math.min((uvIndex / 12) * 100, 100);

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-md flex flex-col justify-between h-full min-h-[220px]">
      <span className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2">
        <Sun className="h-4.5 w-4.5 text-blue-500" />
        UV Index
      </span>

      <div className="flex items-center justify-between my-2 gap-4">
        <div>
          <span className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-slate-805 dark:text-white block">
            {uvIndex}
          </span>
          <span className={`text-sm font-bold ${uvLevel.color} block mt-1`}>
            {uvLevel.text}
          </span>
        </div>

        {/* Circular Dial representation */}
        <div className="relative h-18 w-18 flex items-center justify-center shrink-0">
          <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
            {/* Background ring */}
            <path
              className="text-slate-200 dark:text-slate-800"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Progress indicator */}
            <path
              className="text-amber-500 transition-all duration-1000"
              strokeWidth="3.5"
              strokeDasharray={`${fillPercent}, 100`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <Sun className="absolute h-5 w-5 text-amber-500" />
        </div>
      </div>

      <p className="text-[10px] font-medium text-slate-450 leading-relaxed border-t border-slate-200/35 dark:border-slate-800/25 pt-3 mt-1">
        {uvLevel.desc} Protection is recommended between 10:00 AM and 04:00 PM.
      </p>
    </div>
  );
};

export default UVIndexCard;
