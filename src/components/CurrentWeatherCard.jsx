import React from 'react';
import { MapPin, Heart, Calendar } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import WeatherIcon from './WeatherIcon';

const CurrentWeatherCard = () => {
  const { weatherData, favorites, toggleFavorite, convertTemp } = useWeather();

  if (!weatherData) return null;

  const { city, country, current } = weatherData;
  const isFavorite = favorites.includes(city);

  // Formatting Date
  const formatDate = () => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
      
      {/* Background radial glow */}
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/5"></div>
      
      {/* Info Side */}
      <div className="space-y-4 text-center md:text-left z-10 w-full md:w-auto">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <span className="flex items-center gap-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <MapPin className="h-4 w-4 text-blue-500 shrink-0" />
            {city}, {country}
          </span>
          
          {/* Favorite Toggle button */}
          <button
            onClick={() => toggleFavorite(city)}
            className="p-1.5 rounded-lg border border-slate-200/50 hover:bg-slate-100 dark:border-slate-800/30 dark:hover:bg-slate-900/50 transition-all duration-300"
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Heart className={`h-4.5 w-4.5 transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
          </button>
        </div>

        <div>
          <h2 className="text-6xl md:text-7xl font-extrabold font-display tracking-tighter text-slate-850 dark:text-white select-none">
            {convertTemp(current.temp)}°
          </h2>
          <p className="text-lg font-bold text-slate-700 dark:text-slate-200 mt-1">{current.condition}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Feels like: <strong className="text-slate-700 dark:text-slate-200">{convertTemp(current.feelsLike)}°</strong></span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 hidden sm:inline-block"></span>
          <span>H: <strong className="text-slate-700 dark:text-slate-200">{convertTemp(weatherData.daily[0].tempMax)}°</strong></span>
          <span>L: <strong className="text-slate-700 dark:text-slate-200">{convertTemp(weatherData.daily[0].tempMin)}°</strong></span>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-bold text-slate-400 pt-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate()}</span>
        </div>
      </div>

      {/* Meteorological Visual Icon Side */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-slate-800/10 dark:to-slate-700/10 p-6 rounded-2xl border border-white/20 dark:border-white/5 w-32 h-32 md:w-40 md:h-40 shadow-inner shrink-0 z-10 select-none">
        <WeatherIcon icon={current.icon} className="h-16 w-16 md:h-20 md:w-20 drop-shadow-lg" />
      </div>
      
    </div>
  );
};

export default CurrentWeatherCard;
