import React from 'react';
import { Wind, Navigation } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const WindDirectionCard = () => {
  const { weatherData, convertWind } = useWeather();

  if (!weatherData) return null;

  const { windSpeed, windDir } = weatherData.current;

  // Convert degree to Cardinal direction
  const getCardinalDirection = (angle) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 22.5) % 16;
    return directions[index];
  };

  const cardinal = getCardinalDirection(windDir);

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-md flex flex-col justify-between h-full min-h-[220px]">
      <span className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2">
        <Wind className="h-4.5 w-4.5 text-blue-500" />
        Wind Status
      </span>

      <div className="flex items-center justify-between my-2 gap-4">
        {/* Speed output */}
        <div>
          <span className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-800 dark:text-white block">
            {convertWind(windSpeed)}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
            Direction: <strong className="text-slate-700 dark:text-slate-200">{cardinal} ({windDir}°)</strong>
          </span>
        </div>

        {/* Dynamic Compass Needle Visualizer */}
        <div className="relative h-18 w-18 md:h-20 md:w-20 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center bg-slate-100/40 dark:bg-slate-900/40 shadow-inner shrink-0 select-none">
          {/* Compass labels */}
          <span className="absolute top-1 text-[8px] font-extrabold text-slate-450">N</span>
          <span className="absolute bottom-1 text-[8px] font-extrabold text-slate-450">S</span>
          <span className="absolute right-1 text-[8px] font-extrabold text-slate-450">E</span>
          <span className="absolute left-1 text-[8px] font-extrabold text-slate-450">W</span>
          
          {/* Compass pointer */}
          <div 
            className="transition-transform duration-1000 ease-out"
            style={{ transform: `rotate(${windDir}deg)` }}
          >
            <Navigation className="h-6 w-6 text-blue-500 fill-blue-500" />
          </div>
        </div>
      </div>

      <p className="text-[10px] font-medium text-slate-450 leading-relaxed border-t border-slate-200/35 dark:border-slate-800/25 pt-3 mt-1">
        Wind speeds are calculated using rolling hourly averages. Gusts may vary based on geography.
      </p>
    </div>
  );
};

export default WindDirectionCard;
