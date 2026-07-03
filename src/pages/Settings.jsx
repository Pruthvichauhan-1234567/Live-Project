import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Settings, Sun, Moon, Bell, Globe, RotateCcw, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  const {
    theme,
    toggleTheme,
    tempUnit,
    setTempUnit,
    windSpeedUnit,
    setWindSpeedUnit,
    language,
    setLanguage,
    notificationsEnabled,
    toggleNotifications,
    clearRecentSearches
  } = useWeather();

  const handleResetSettings = () => {
    // Reset configurations to default
    localStorage.clear();
    window.location.reload();
  };

  const languages = [
    { code: 'en', name: 'English (US)' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'ja', name: '日本語' },
    { code: 'hi', name: 'हिन्दी' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-2xl"
    >
      
      {/* Title */}
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-blue-500" />
        <div>
          <h2 className="text-xl font-extrabold text-slate-805 dark:text-white">Settings</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Customize your meteorological dashboard preferences</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Theme Settings */}
        <div className="glass-panel rounded-3xl p-5 md:p-6 shadow-sm border border-slate-205/30 dark:border-slate-800/20 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              {theme === 'dark' ? <Moon className="h-4.5 w-4.5 text-blue-500" /> : <Sun className="h-4.5 w-4.5 text-amber-500" />}
              Theme Mode
            </span>
            <p className="text-[11px] font-medium text-slate-400">Toggle dark and light visual mode interface</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
              theme === 'dark' ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          >
            <span
              className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform duration-300 ${
                theme === 'dark' ? 'translate-x-5.5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Temperature Unit */}
        <div className="glass-panel rounded-3xl p-5 md:p-6 shadow-sm border border-slate-205/30 dark:border-slate-800/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-sm font-extrabold text-slate-850 dark:text-white">Temperature Unit</span>
            <p className="text-[11px] font-medium text-slate-400">Select standard scale for temperature summaries</p>
          </div>
          <div className="flex gap-1.5 p-1 rounded-xl bg-slate-100/50 border border-slate-200/50 dark:bg-slate-900/40 dark:border-slate-800/45 self-end sm:self-auto">
            <button
              onClick={() => setTempUnit('C')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                tempUnit === 'C'
                  ? 'bg-white text-blue-500 shadow-sm dark:bg-slate-850 dark:text-blue-400'
                  : 'text-slate-400 hover:text-slate-650 dark:hover:text-slate-200'
              }`}
            >
              Celsius (°C)
            </button>
            <button
              onClick={() => setTempUnit('F')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                tempUnit === 'F'
                  ? 'bg-white text-blue-500 shadow-sm dark:bg-slate-850 dark:text-blue-400'
                  : 'text-slate-400 hover:text-slate-650 dark:hover:text-slate-200'
              }`}
            >
              Fahrenheit (°F)
            </button>
          </div>
        </div>

        {/* Wind Speed Unit */}
        <div className="glass-panel rounded-3xl p-5 md:p-6 shadow-sm border border-slate-205/30 dark:border-slate-800/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-sm font-extrabold text-slate-850 dark:text-white">Wind Speed Unit</span>
            <p className="text-[11px] font-medium text-slate-400">Choose velocity calculation format for gusts</p>
          </div>
          <div className="flex gap-1.5 p-1 rounded-xl bg-slate-100/50 border border-slate-200/50 dark:bg-slate-900/40 dark:border-slate-800/45 self-end sm:self-auto">
            {['km/h', 'mph', 'm/s'].map((unit) => (
              <button
                key={unit}
                onClick={() => setWindSpeedUnit(unit)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                  windSpeedUnit === unit
                    ? 'bg-white text-blue-500 shadow-sm dark:bg-slate-850 dark:text-blue-400'
                    : 'text-slate-400 hover:text-slate-650 dark:hover:text-slate-200'
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>

        {/* Language selector */}
        <div className="glass-panel rounded-3xl p-5 md:p-6 shadow-sm border border-slate-205/30 dark:border-slate-800/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-sm font-extrabold text-slate-850 dark:text-white flex items-center gap-2">
              <Globe className="h-4.5 w-4.5 text-blue-500" />
              Language Selector
            </span>
            <p className="text-[11px] font-medium text-slate-400">Choose localized translation dialect</p>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200/60 bg-white/40 text-xs font-bold text-slate-700 focus:outline-none dark:bg-slate-900/40 dark:border-slate-800/65 dark:text-slate-200 transition-colors"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="dark:bg-slate-900">
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications Toggle */}
        <div className="glass-panel rounded-3xl p-5 md:p-6 shadow-sm border border-slate-205/30 dark:border-slate-800/20 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <Bell className="h-4.5 w-4.5 text-blue-500" />
              Alert Notifications
            </span>
            <p className="text-[11px] font-medium text-slate-400">Receive alert warnings for extreme storms</p>
          </div>
          <button
            onClick={toggleNotifications}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
              notificationsEnabled ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          >
            <span
              className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform duration-300 ${
                notificationsEnabled ? 'translate-x-5.5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* System & Operations */}
        <div className="glass-panel rounded-3xl p-5 md:p-6 shadow-sm border border-slate-205/30 dark:border-slate-800/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-sm font-extrabold text-slate-850 dark:text-white flex items-center gap-2">
              <RotateCcw className="h-4.5 w-4.5 text-rose-500" />
              Factory Reset Settings
            </span>
            <p className="text-[11px] font-medium text-slate-400">Clears cookies, stored search terms, and resets units</p>
          </div>
          <button
            onClick={handleResetSettings}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-colors shadow-sm self-end sm:self-auto"
          >
            Reset Application
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wide justify-center pt-4">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <span>System active - AntigravitySky build v1.2</span>
      </div>

    </motion.div>
  );
};

export default SettingsPage;
