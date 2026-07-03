import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { motion, AnimatePresence } from 'framer-motion';

const WeatherAlerts = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const alerts = weatherData.current.alerts || [];

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3.5 mb-6">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Active Advisories
      </h3>
      <AnimatePresence>
        {alerts.map((alert, idx) => {
          const isSevere = alert.severity.toLowerCase() === 'severe';
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative overflow-hidden rounded-2xl p-4 border shadow-sm ${
                isSevere
                  ? 'bg-rose-500/10 border-rose-500/35 text-rose-800 dark:text-rose-300 dark:bg-rose-950/20'
                  : 'bg-amber-500/10 border-amber-500/35 text-amber-800 dark:text-amber-300 dark:bg-amber-950/20'
              }`}
            >
              <div className="flex gap-3">
                <div className="mt-0.5 shrink-0">
                  {isSevere ? (
                    <AlertTriangle className="h-5 w-5 text-rose-500 animate-bounce" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 animate-pulse" />
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold tracking-tight">{alert.title}</h4>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      isSevere 
                        ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' 
                        : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-450 dark:text-slate-400">
                    Issued by: {alert.sender}
                  </p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                    {alert.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default WeatherAlerts;
