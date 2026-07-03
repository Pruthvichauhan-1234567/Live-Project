import React from 'react';
import { useWeather } from '../context/WeatherContext';
import WeatherIcon from '../components/WeatherIcon';
import WeatherCharts from '../components/WeatherCharts';
import { ChartSkeleton, CardSkeleton } from '../components/Skeletons';
import { Clock, Droplet, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const HourlyForecast = () => {
  const { weatherData, loading, convertTemp } = useWeather();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  if (loading || !weatherData) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-52 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg skeleton-pulse"></div>
        <div className="flex gap-4 overflow-x-hidden py-2 select-none">
          {[1, 2, 3, 4, 5, 6].map(idx => (
            <div key={idx} className="w-28 shrink-0">
              <CardSkeleton />
            </div>
          ))}
        </div>
        <ChartSkeleton />
      </div>
    );
  }

  // Mapper of conditions to animation weather icon names
  const getIcon = (cond) => {
    const c = cond.toLowerCase();
    if (c.includes('sunny')) return 'sun';
    if (c.includes('rain')) return 'cloud-rain';
    if (c.includes('cloud')) return 'cloud-sun';
    if (c.includes('lightning') || c.includes('thunder')) return 'cloud-lightning';
    return 'cloud';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      
      {/* Title */}
      <motion.div variants={itemVariants} className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-blue-500" />
        <div>
          <h2 className="text-xl font-extrabold text-slate-805 dark:text-white">Hourly Forecast</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">24-hour visual overview for {weatherData.city}</p>
        </div>
      </motion.div>

      {/* Horizontal Scrollable Timeline */}
      <motion.div 
        variants={itemVariants} 
        className="flex gap-4 overflow-x-auto py-3 px-1.5 scrollbar-thin select-none"
      >
        {weatherData.hourly.map((h, idx) => (
          <div 
            key={idx}
            className="glass-panel glass-panel-hover flex flex-col items-center justify-between p-4.5 rounded-2xl w-28 shrink-0 shadow-sm border border-slate-200/50 dark:border-slate-800/20 text-center gap-2.5"
          >
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{h.time}</span>
            
            <div className="my-1.5 flex h-10 w-10 items-center justify-center bg-slate-100/40 dark:bg-slate-900/30 rounded-xl">
              <WeatherIcon icon={getIcon(h.condition)} className="h-6 w-6" />
            </div>

            <div>
              <span className="text-lg font-extrabold font-display text-slate-800 dark:text-white block">
                {convertTemp(h.temp)}°
              </span>
              <span className="text-[9px] font-bold text-blue-500 dark:text-blue-400 flex items-center justify-center gap-0.5 mt-0.5">
                <Droplet className="h-2.5 w-2.5 fill-blue-500/10" />
                {h.rainProb}%
              </span>
            </div>

            <div className="text-[9px] font-bold text-slate-400 flex items-center justify-center gap-0.5">
              <Navigation className="h-2.5 w-2.5 rotate-45 text-slate-400" />
              <span>{h.windSpeed} km/h</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Interactive charts panel */}
      <motion.div variants={itemVariants}>
        <WeatherCharts />
      </motion.div>

    </motion.div>
  );
};

export default HourlyForecast;
