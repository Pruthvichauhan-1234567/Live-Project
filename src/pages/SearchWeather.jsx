import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { Search, RotateCcw, Award, Globe, Trash2, MapPin, ChevronRight, AlertCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import WeatherIcon from '../components/WeatherIcon';
import weatherDatabase from '../data/weatherData.json';

const SearchWeather = () => {
  const {
    currentCity,
    changeCity,
    recentSearches,
    favorites,
    toggleFavorite,
    clearRecentSearches,
    removeRecentSearch,
    convertTemp,
    availableCities,
    error,
    setError
  } = useWeather();

  const [query, setQuery] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const success = changeCity(query.trim());
    if (success) {
      setQuery('');
      setError(null);
    }
  };

  // Filter suggestions
  const suggestions = query
    ? availableCities.filter(c => c.toLowerCase().includes(query.toLowerCase()))
    : [];

  const popularCitiesList = ['Tokyo', 'London', 'Sydney', 'Mumbai', 'Cairo', 'New York'];

  // Helper to resolve icon from condition
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
      className="space-y-8"
    >
      
      {/* Search Input Container */}
      <motion.div variants={itemVariants} className="max-w-xl">
        <h2 className="text-xl font-extrabold text-slate-805 dark:text-white mb-1">Search City</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase mb-4">Discover live conditions around the globe</p>
        
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Type city (e.g. Mumbai, Tokyo, London...)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setError(null);
            }}
            className="w-full h-12 pl-12 pr-4 rounded-2xl border border-slate-205/60 bg-white/40 dark:bg-slate-900/30 dark:border-slate-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        </form>

        {/* Suggestions Tray */}
        {query && suggestions.length > 0 && (
          <div className="glass-panel mt-2 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-850/50 py-2.5 max-h-56 overflow-y-auto">
            {suggestions.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  changeCity(city);
                  setQuery('');
                }}
                className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 dark:text-slate-350 hover:bg-blue-500/10 hover:text-blue-500 flex items-center justify-between"
              >
                <span>{city} ({weatherDatabase[city].country})</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
            ))}
          </div>
        )}

        {/* Empty state when query matches nothing */}
        {query && suggestions.length === 0 && (
          <div className="glass-panel mt-2 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-850/50 text-center text-xs font-semibold text-slate-450 flex items-center justify-center gap-2">
            <AlertCircle className="h-4.5 w-4.5 text-amber-500 shrink-0" />
            <span>No matching cities in our current database. Search London, Cairo, Sydney, etc.</span>
          </div>
        )}
      </motion.div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <RotateCcw className="h-4 w-4" />
              Recent Searches
            </h3>
            <button
              onClick={clearRecentSearches}
              className="text-[10px] font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              Clear All
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {recentSearches.map((city) => (
              <div 
                key={city}
                className="glass-panel flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800/30 text-xs font-bold text-slate-650 dark:text-slate-300"
              >
                <button 
                  onClick={() => changeCity(city)}
                  className="hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {city}
                </button>
                <button 
                  onClick={() => removeRecentSearch(city)}
                  className="p-0.5 text-slate-400 hover:text-slate-600 rounded"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Popular Cities Grid */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Globe className="h-4 w-4 text-blue-500" />
          Popular Cities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCitiesList.map((city) => {
            const data = weatherDatabase[city];
            if (!data) return null;
            const isFav = favorites.includes(city);
            
            return (
              <div
                key={city}
                className={`glass-panel glass-panel-hover rounded-3xl p-5 border border-slate-200/40 dark:border-slate-800/20 shadow-sm flex flex-col justify-between h-40 ${
                  currentCity === city ? 'ring-2 ring-blue-500/30 dark:ring-blue-400/20 border-blue-500 dark:border-blue-400' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <button 
                    onClick={() => changeCity(city)}
                    className="text-left group"
                  >
                    <span className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      <MapPin className="h-3.5 w-3.5 text-blue-500" />
                      {city}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{data.country}</span>
                  </button>
                  
                  {/* Heart favorite button */}
                  <button
                    onClick={() => toggleFavorite(city)}
                    className="p-1 rounded-lg hover:bg-slate-200/30 text-slate-400 dark:hover:bg-slate-850/40"
                  >
                    <Heart className={`h-4.5 w-4.5 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                  </button>
                </div>

                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <span className="text-3xl font-extrabold font-display text-slate-800 dark:text-white">
                      {convertTemp(data.current.temp)}°
                    </span>
                    <span className="text-[10px] font-bold text-slate-450 block">{data.current.condition}</span>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center bg-slate-100/40 dark:bg-slate-900/30 rounded-xl select-none">
                    <WeatherIcon icon={getIcon(data.current.condition)} className="h-7 w-7" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default SearchWeather;
