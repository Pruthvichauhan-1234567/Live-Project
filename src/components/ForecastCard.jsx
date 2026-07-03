import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Droplet, Wind, Sun } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { useWeather } from '../context/WeatherContext';
import { motion, AnimatePresence } from 'framer-motion';

const ForecastCard = ({ dayData, isToday = false }) => {
  const { convertTemp, convertWind } = useWeather();
  const [expanded, setExpanded] = useState(false);

  const { day, date, tempMax, tempMin, condition, rainProb, uvIndex, icon } = dayData;

  // UV risk level mapping
  const getUvRisk = (uv) => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    return 'Very High';
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      
      {/* Clickable Header bar */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none transition-colors duration-200 hover:bg-slate-100/10"
      >
        <div className="flex items-center gap-4">
          {/* Calendar day */}
          <div className="w-20 md:w-28">
            <p className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
              {day}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">{date}</p>
          </div>

          {/* Condition Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100/30 dark:bg-slate-900/30">
            <WeatherIcon icon={icon} className="h-6 w-6" />
          </div>

          {/* Condition Name */}
          <span className="hidden md:inline-block text-xs font-semibold text-slate-600 dark:text-slate-350">
            {condition}
          </span>
        </div>

        {/* Rain Probability / Temperatures */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Rain prob */}
          <span className="text-xs font-bold text-blue-500 dark:text-blue-400 flex items-center gap-1">
            <Droplet className="h-3.5 w-3.5 fill-blue-500/20" />
            {rainProb}%
          </span>

          {/* Max/Min Temperature tags */}
          <div className="text-right">
            <span className="text-sm font-extrabold text-slate-800 dark:text-white mr-2.5">
              {convertTemp(tempMax)}°
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {convertTemp(tempMin)}°
            </span>
          </div>

          {/* Toggle trigger */}
          <div className="text-slate-400 hover:text-slate-600">
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
        </div>
      </button>

      {/* Accordion Expand Drawer */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-slate-100/20 dark:bg-slate-900/20 border-t border-slate-200/20 dark:border-slate-800/25"
          >
            <div className="grid grid-cols-3 gap-3 p-4 text-center">
              
              {/* Rain description */}
              <div className="p-3 bg-white/20 dark:bg-slate-950/20 rounded-xl border border-slate-250/15">
                <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 uppercase mb-1">
                  <Droplet className="h-3.5 w-3.5 text-blue-500" />
                  Precipitation
                </span>
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-250">{rainProb}% Chance</span>
              </div>

              {/* Wind Speed description */}
              <div className="p-3 bg-white/20 dark:bg-slate-950/20 rounded-xl border border-slate-250/15">
                <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 uppercase mb-1">
                  <Wind className="h-3.5 w-3.5 text-teal-500" />
                  Wind speed
                </span>
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-250">
                  {convertWind(isToday ? 14 : 16)}
                </span>
              </div>

              {/* UV description */}
              <div className="p-3 bg-white/20 dark:bg-slate-950/20 rounded-xl border border-slate-250/15">
                <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 uppercase mb-1">
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                  UV Risk
                </span>
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-250">{uvIndex} ({getUvRisk(uvIndex)})</span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ForecastCard;
