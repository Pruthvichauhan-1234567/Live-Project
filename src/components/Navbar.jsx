import React, { useState, useRef, useEffect } from 'react';
import { Search, Sun, Moon, Bell, Menu, X, CloudSun, Check, AlertCircle } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const Navbar = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const {
    currentCity,
    theme,
    toggleTheme,
    tempUnit,
    setTempUnit,
    weatherData,
    availableCities,
    changeCity,
    error,
    setError
  } = useWeather();

  const [searchVal, setSearchVal] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const suggestionRef = useRef(null);
  const notificationRef = useRef(null);

  // Filter suggestion list
  const suggestions = searchVal
    ? availableCities.filter(c => c.toLowerCase().includes(searchVal.toLowerCase()))
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    const success = changeCity(searchVal.trim());
    if (success) {
      setSearchVal('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    changeCity(city);
    setSearchVal('');
    setShowSuggestions(false);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotificationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alerts = weatherData?.current?.alerts || [];

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-20 border-b border-slate-200/50 bg-white/40 px-4 md:px-8 backdrop-blur-xl dark:border-slate-800/30 dark:bg-slate-950/40 flex items-center justify-between z-20">
      
      {/* Mobile brand header */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-500/20">
          <CloudSun className="h-5 w-5" />
        </div>
        <span className="font-display font-bold text-slate-800 dark:text-white text-base">AntigravitySky</span>
      </div>

      {/* Interactive Autocomplete Search */}
      <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-72 md:w-96" ref={suggestionRef}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search city (e.g. Tokyo, London, Mumbai...)"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              setShowSuggestions(true);
              setError(null);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200/60 bg-white/40 dark:bg-slate-900/30 dark:border-slate-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 text-slate-700 dark:text-slate-200 text-sm font-medium transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>

        {/* Suggestion Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-13 left-0 right-0 glass-panel rounded-xl shadow-lg border border-slate-200/60 dark:border-slate-800/50 py-2 max-h-60 overflow-y-auto z-50">
            {suggestions.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handleSuggestionClick(city)}
                className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-500/10 hover:text-blue-500 dark:hover:text-blue-400 flex items-center justify-between transition-colors duration-250"
              >
                <span>{city}</span>
                {city === currentCity && <Check className="h-4 w-4 text-blue-500" />}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        {/* Fahrenheit / Celsius Switch */}
        <div className="flex p-0.5 rounded-lg border border-slate-200/60 bg-slate-100/50 dark:bg-slate-900/50 dark:border-slate-800/60">
          <button
            onClick={() => setTempUnit('C')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-300 ${
              tempUnit === 'C'
                ? 'bg-white text-blue-500 shadow-sm dark:bg-slate-800 dark:text-blue-400'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            °C
          </button>
          <button
            onClick={() => setTempUnit('F')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-300 ${
              tempUnit === 'F'
                ? 'bg-white text-blue-500 shadow-sm dark:bg-slate-800 dark:text-blue-400'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            °F
          </button>
        </div>

        {/* Light/Dark Toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/60 bg-white/40 text-slate-500 hover:text-slate-800 hover:bg-white dark:bg-slate-900/40 dark:border-slate-800/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900/80 transition-all duration-300 shadow-sm"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Weather Alerts Notification bell */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/60 bg-white/40 text-slate-500 hover:text-slate-800 hover:bg-white dark:bg-slate-900/40 dark:border-slate-800/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900/80 transition-all duration-300 shadow-sm"
            aria-label="Open Notifications"
          >
            <Bell className="h-5 w-5" />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
          </button>

          {/* Alerts Dropdown Drawer */}
          {showNotificationDropdown && (
            <div className="absolute right-0 top-13 w-80 glass-panel rounded-xl shadow-lg border border-slate-200/60 dark:border-slate-800/50 p-4 z-50">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                <span className="text-sm font-bold text-slate-800 dark:text-white">Active Alerts ({alerts.length})</span>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {alerts.length > 0 ? (
                  alerts.map((alert, idx) => (
                    <div key={idx} className="p-3 bg-red-500/10 border border-red-500/25 rounded-lg">
                      <div className="flex items-start gap-2 text-red-500">
                        <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold">{alert.title}</p>
                          <p className="text-[11px] font-semibold text-red-400 dark:text-red-300 mt-0.5">{alert.sender}</p>
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-3">{alert.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs font-medium text-slate-400 py-4 text-center">No active meteorological alerts in {currentCity}.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
