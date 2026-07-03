import React from 'react';
import { Sunrise, Sunset } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const SunriseSunsetCard = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { sunrise, sunset } = weatherData.current;

  // Let's create an elegant visual mock arc representing daylight progress.
  // Assuming a constant midday placement for visual demonstration
  const dayProgressPercent = 65; 

  // Math for solar position on arc Q(10,80 to 110,80)
  // Let's parameterize the quadratic bezier curve for the sun position
  const t = dayProgressPercent / 100;
  // Control points: P0 = (10, 80), P1 = (60, 10), P2 = (110, 80)
  const sunX = (1 - t) * (1 - t) * 10 + 2 * (1 - t) * t * 60 + t * t * 110;
  const sunY = (1 - t) * (1 - t) * 80 + 2 * (1 - t) * t * 10 + t * t * 80;

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-md flex flex-col justify-between h-full min-h-[220px]">
      <span className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2">
        <Sunrise className="h-4.5 w-4.5 text-blue-500" />
        Sunrise & Sunset
      </span>

      {/* SVG Solar Arc */}
      <div className="relative w-full flex items-center justify-center my-2">
        <svg viewBox="0 0 120 90" className="w-full max-w-[180px] h-auto overflow-visible text-slate-200 dark:text-slate-800">
          {/* Horizon Line */}
          <line x1="0" y1="80" x2="120" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Solar Pathway Bezier */}
          <path
            d="M 10 80 Q 60 10 110 80"
            fill="none"
            stroke="url(#arcGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Filled daylight path */}
          <path
            d={`M 10 80 Q 60 10 110 80`}
            fill="none"
            stroke="url(#solarGoldGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="180"
            strokeDashoffset={180 - (180 * dayProgressPercent) / 100}
            className="opacity-75"
          />

          {/* Glowing Sun Marker */}
          <circle cx={sunX} cy={sunY} r="4.5" className="fill-amber-400 stroke-white stroke-1 dark:stroke-slate-900 shadow-lg" />
          <circle cx={sunX} cy={sunY} r="9" className="fill-amber-400/20 animate-pulse" />

          {/* Gradients */}
          <defs>
            <linearGradient id="arcGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="solarGoldGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Numerical Sunrise & Sunset */}
      <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-300 px-1 border-t border-slate-200/35 dark:border-slate-800/25 pt-3.5">
        <div className="flex items-center gap-1.5">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
            <Sunrise className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Sunrise</p>
            <p className="text-xs font-extrabold">{sunrise}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-right">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Sunset</p>
            <p className="text-xs font-extrabold">{sunset}</p>
          </div>
          <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500">
            <Sunset className="h-4.5 w-4.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunsetCard;
