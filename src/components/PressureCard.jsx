import React from 'react';
import { Compass } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const PressureCard = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { pressure } = weatherData.current;

  // Classify pressure condition
  const getPressureLabel = (pres) => {
    if (pres < 1009) return { text: 'Low Pressure', color: 'text-sky-500', desc: 'Typical of stormy, rainy conditions.' };
    if (pres <= 1020) return { text: 'Normal', color: 'text-emerald-500', desc: 'Indicates stable, typical weather.' };
    return { text: 'High Pressure', color: 'text-amber-500', desc: 'Often signifies dry, clear skies.' };
  };

  const labelInfo = getPressureLabel(pressure);

  // Position relative to a standard range: 970 to 1040 hPa
  const scalePercent = Math.min(Math.max(((pressure - 970) / (1040 - 970)) * 100, 0), 100);

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-md flex flex-col justify-between h-full min-h-[220px]">
      <span className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2">
        <Compass className="h-4.5 w-4.5 text-blue-500" />
        Barometric Pressure
      </span>

      <div className="flex items-center justify-between my-2 gap-4">
        <div>
          <span className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-805 dark:text-white block">
            {pressure} <span className="text-sm font-medium text-slate-400">hPa</span>
          </span>
          <span className={`text-xs font-bold ${labelInfo.color} block mt-1.5`}>
            {labelInfo.text}
          </span>
        </div>
      </div>

      <div className="w-full mt-2">
        <div className="relative h-1.5 w-full rounded-full bg-slate-200/50 dark:bg-slate-800/80 overflow-hidden">
          <div 
            className="absolute top-0 bottom-0 w-2.5 bg-blue-500 rounded-full border border-white dark:border-slate-900 transition-all duration-1000"
            style={{ left: `calc(${scalePercent}% - 5px)` }}
          ></div>
        </div>
      </div>

      <p className="text-[10px] font-medium text-slate-450 leading-relaxed border-t border-slate-200/35 dark:border-slate-800/25 pt-3.5 mt-2">
        {labelInfo.desc} High-pressure systems block weather front movements.
      </p>
    </div>
  );
};

export default PressureCard;
