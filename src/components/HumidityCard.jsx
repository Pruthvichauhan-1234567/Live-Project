import React from 'react';
import { Droplet } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const HumidityCard = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { humidity } = weatherData.current;

  // Classify humidity range description
  const getHumidityDescription = (hum) => {
    if (hum < 30) return 'Dry air, might feel slightly cold.';
    if (hum <= 60) return 'Ideal moisture levels, comfortable.';
    if (hum <= 80) return 'Humid environment, moisture heavy.';
    return 'Very humid, sticky environment.';
  };

  const desc = getHumidityDescription(humidity);

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-md flex flex-col justify-between h-full min-h-[220px]">
      <span className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2">
        <Droplet className="h-4.5 w-4.5 text-blue-500" />
        Humidity
      </span>

      <div className="flex items-center justify-between my-2 gap-4">
        <div>
          <span className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-slate-808 dark:text-white block">
            {humidity}%
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mt-1">
            Ideal range is 35% - 55%
          </span>
        </div>

        {/* Liquid level mockup slider */}
        <div className="h-14 w-5 bg-slate-200/50 dark:bg-slate-800/80 rounded-full overflow-hidden flex items-end shrink-0 select-none">
          <div 
            className="w-full bg-gradient-to-t from-blue-600 to-sky-400 rounded-b-full transition-all duration-1000"
            style={{ height: `${humidity}%` }}
          ></div>
        </div>
      </div>

      <p className="text-[10px] font-medium text-slate-450 leading-relaxed border-t border-slate-200/35 dark:border-slate-800/25 pt-3 mt-1">
        {desc}
      </p>
    </div>
  );
};

export default HumidityCard;
