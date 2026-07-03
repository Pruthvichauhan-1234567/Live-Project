import React from 'react';
import { Wind, ShieldAlert, Sparkles } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const AirQualityCard = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { airQuality } = weatherData.current;

  // Decide colors and alerts depending on AQI value
  const getAqiTheme = (aqi) => {
    if (aqi <= 50) {
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/5',
        border: 'border-emerald-500/25 dark:border-emerald-500/15',
        text: 'text-emerald-600 dark:text-emerald-400',
        dot: 'bg-emerald-500',
        desc: 'Air quality is satisfactory, and air pollution poses little or no risk.',
        icon: Sparkles
      };
    }
    if (aqi <= 100) {
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-500/5',
        border: 'border-amber-500/25 dark:border-amber-500/15',
        text: 'text-amber-600 dark:text-amber-400',
        dot: 'bg-amber-500',
        desc: 'Air quality is acceptable. However, sensitive groups may experience minor effects.',
        icon: Wind
      };
    }
    // Unhealthy / Poor
    return {
      bg: 'bg-rose-500/10 dark:bg-rose-500/5',
      border: 'border-rose-500/25 dark:border-rose-500/15',
      text: 'text-rose-600 dark:text-rose-400',
      dot: 'bg-rose-500',
      desc: 'Members of sensitive groups may experience health effects. Public should limit exertion.',
      icon: ShieldAlert
    };
  };

  const aqiTheme = getAqiTheme(airQuality.aqi);
  const StatusIcon = aqiTheme.icon;

  // Calculate percentage for progress gauge
  const progressPercent = Math.min((airQuality.aqi / 200) * 100, 100);

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-md flex flex-col h-full justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Wind className="h-4.5 w-4.5 text-blue-500" />
          Air Quality Index
        </span>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${aqiTheme.bg} ${aqiTheme.border} ${aqiTheme.text}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          {airQuality.label}
        </div>
      </div>

      {/* Index Summary */}
      <div className="flex items-end gap-6 mb-6">
        <div>
          <span className="text-5xl font-extrabold font-display tracking-tight text-slate-800 dark:text-white">
            {airQuality.aqi}
          </span>
          <p className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">AQI value</p>
        </div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          {aqiTheme.desc}
        </p>
      </div>

      {/* AQI Progress Gauge bar */}
      <div className="mb-6">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5 uppercase">
          <span>0 (Good)</span>
          <span>100 (Mod)</span>
          <span>200+ (Poor)</span>
        </div>
        <div className="relative h-2 w-full rounded-full bg-slate-200/50 dark:bg-slate-800/80 overflow-hidden">
          {/* Visual gradient overlay matching standard US AQI */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 opacity-60"></div>
          {/* Marker pointing to active value */}
          <div 
            className="absolute top-0 bottom-0 w-1.5 bg-white border border-slate-400 dark:border-slate-800 rounded-full transition-all duration-1000 shadow-sm"
            style={{ left: `calc(${progressPercent}% - 3px)` }}
          ></div>
        </div>
      </div>

      {/* Grid of micro-pollutants */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <div className="p-3 bg-slate-100/40 dark:bg-slate-900/20 border border-slate-200/40 dark:border-slate-800/40 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">PM2.5</span>
            <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">{airQuality.pm25} <span className="text-[9px] font-medium text-slate-400">µg/m³</span></span>
          </div>
        </div>
        <div className="p-3 bg-slate-100/40 dark:bg-slate-900/20 border border-slate-200/40 dark:border-slate-800/40 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">PM10</span>
            <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">{airQuality.pm10} <span className="text-[9px] font-medium text-slate-400">µg/m³</span></span>
          </div>
        </div>
        <div className="p-3 bg-slate-100/40 dark:bg-slate-900/20 border border-slate-200/40 dark:border-slate-800/40 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">CO</span>
            <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">{airQuality.co} <span className="text-[9px] font-medium text-slate-400">mg/m³</span></span>
          </div>
        </div>
        <div className="p-3 bg-slate-100/40 dark:bg-slate-900/20 border border-slate-200/40 dark:border-slate-800/40 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">NO₂</span>
            <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">{airQuality.no2} <span className="text-[9px] font-medium text-slate-400">µg/m³</span></span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AirQualityCard;
