import React from 'react';
import { useWeather } from '../context/WeatherContext';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import AirQualityCard from '../components/AirQualityCard';
import SunriseSunsetCard from '../components/SunriseSunsetCard';
import WindDirectionCard from '../components/WindDirectionCard';
import UVIndexCard from '../components/UVIndexCard';
import HumidityCard from '../components/HumidityCard';
import PressureCard from '../components/PressureCard';
import VisibilityCard from '../components/VisibilityCard';
import WeatherAlerts from '../components/WeatherAlerts';
import { CurrentWeatherSkeleton, CardSkeleton } from '../components/Skeletons';
import { motion } from 'framer-motion';

const Home = () => {
  const { loading, weatherData } = useWeather();

  // Page animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
  };

  if (loading || !weatherData) {
    return (
      <div className="space-y-6">
        <CurrentWeatherSkeleton />
        <div>
          <div className="h-5 w-36 bg-slate-200/50 dark:bg-slate-800/80 rounded-lg mb-4 skeleton-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(idx => (
              <CardSkeleton key={idx} />
            ))}
          </div>
        </div>
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
      {/* Weather warnings at the very top */}
      <WeatherAlerts />

      {/* Main Row: Current Weather & AQI */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="xl:col-span-2">
          <CurrentWeatherCard />
        </motion.div>
        <motion.div variants={itemVariants}>
          <AirQualityCard />
        </motion.div>
      </div>

      {/* Highlights Section */}
      <div className="space-y-4">
        <motion.h3 
          variants={itemVariants} 
          className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500"
        >
          Today's Highlights
        </motion.h3>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div variants={itemVariants}>
            <SunriseSunsetCard />
          </motion.div>
          <motion.div variants={itemVariants}>
            <WindDirectionCard />
          </motion.div>
          <motion.div variants={itemVariants}>
            <UVIndexCard />
          </motion.div>
          <motion.div variants={itemVariants}>
            <HumidityCard />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PressureCard />
          </motion.div>
          <motion.div variants={itemVariants}>
            <VisibilityCard />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
