import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Clock, Search, Map, Settings, CloudSun, MapPin } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const Sidebar = () => {
  const { weatherData, convertTemp } = useWeather();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: '7-Day Forecast', path: '/forecast', icon: Calendar },
    { name: 'Hourly Forecast', path: '/hourly', icon: Clock },
    { name: 'Search City', path: '/search', icon: Search },
    { name: 'Weather Map', path: '/map', icon: Map },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="fixed top-0 left-0 hidden h-screen w-64 flex-col border-r border-slate-200/50 bg-white/40 p-6 backdrop-blur-xl dark:border-slate-800/30 dark:bg-slate-950/40 lg:flex z-30">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-500/20">
          <CloudSun className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold tracking-tight text-slate-800 dark:text-white">
            Antigravity<span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Sky</span>
          </h1>
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Weather Hub</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="mt-8 flex-1 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 group ${
                  isActive
                    ? 'bg-blue-50/55 text-blue-600 shadow-sm border-l-3 border-blue-500 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-400'
                    : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-900/30 dark:hover:text-slate-200'
                }`
              }
            >
              <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Current Glance Card */}
      {weatherData && (
        <div className="glass-panel mt-auto rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <MapPin className="h-3 w-3 text-blue-500" />
              {weatherData.city}
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200/50 text-slate-600 dark:bg-slate-800/80 dark:text-slate-300 uppercase">
              {weatherData.current.airQuality.label.split(' ')[0]}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold font-display text-slate-800 dark:text-white">
              {convertTemp(weatherData.current.temp)}°
            </span>
            <span className="text-xs text-slate-400">{weatherData.current.condition}</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
