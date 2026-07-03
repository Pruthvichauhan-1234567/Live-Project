import React from 'react';
import { useWeather } from '../context/WeatherContext';
import ForecastCard from '../components/ForecastCard';
import { ForecastSkeleton } from '../components/Skeletons';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const Forecast7Day = () => {
  const { weatherData, loading } = useWeather();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  if (loading || !weatherData) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-52 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg skeleton-pulse"></div>
        <ForecastSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-blue-500" />
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">7-Day Forecast</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Extended meteorological projections for {weatherData.city}</p>
        </div>
      </motion.div>

      {/* Forecast list */}
      <motion.div variants={containerVariants} className="space-y-3.5">
        {weatherData.daily.map((dayData, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <ForecastCard dayData={dayData} isToday={idx === 0} />
          </motion.div>
        ))}
      </motion.div>

    </motion.div>
  );
};

export default Forecast7Day;
