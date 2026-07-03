import React, { useState, useEffect } from 'react';
import { Map, Layers, Play, Pause, ZoomIn, ZoomOut, Compass, Wind } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { motion } from 'framer-motion';

const WeatherMaps = () => {
  const { currentCity, weatherData } = useWeather();
  const [activeLayer, setActiveLayer] = useState('radar'); // 'radar', 'precipitation', 'satellite'
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState('12:00 PM');
  const [zoomLevel, setZoomLevel] = useState(3);

  // Playback timer simulation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      const times = ['12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM', '02:00 PM'];
      let idx = 0;
      timer = setInterval(() => {
        setPlaybackTime(times[idx]);
        idx = (idx + 1) % times.length;
      }, 800);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const layers = [
    { id: 'radar', label: 'Radar Scan' },
    { id: 'precipitation', label: 'Precipitation' },
    { id: 'satellite', label: 'Satellite Cloud' }
  ];

  // Helper to get radar dot color depending on chosen layer
  const getLayerColor = () => {
    if (activeLayer === 'radar') return 'rgba(34, 197, 94, 0.4)'; // Green radar
    if (activeLayer === 'precipitation') return 'rgba(59, 130, 246, 0.4)'; // Blue precipitation
    return 'rgba(255, 255, 255, 0.25)'; // White clouds
  };

  const getMapTitle = () => {
    if (activeLayer === 'radar') return 'Live Doppler Radar Sweep';
    if (activeLayer === 'precipitation') return 'Rain & Snow Accumulation Map';
    return 'Infrared Satellite Cloud Coverage';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-805 dark:text-white flex items-center gap-2">
            <Map className="h-5 w-5 text-blue-500" />
            Weather Radar Maps
          </h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Simulated real-time satellite imaging overlay</p>
        </div>

        {/* Layer Select buttons */}
        <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-100/50 border border-slate-200/50 dark:bg-slate-900/40 dark:border-slate-800/45 shrink-0">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeLayer === layer.id
                  ? 'bg-blue-500 text-white shadow-sm dark:bg-blue-600'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Dashboard Simulator Frame */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-md border border-slate-200/40 dark:border-slate-800/20 relative w-full aspect-video min-h-[350px] max-h-[500px]">
        
        {/* Background Canvas simulation (a stylized abstract vector map grid) */}
        <div 
          className="absolute inset-0 bg-slate-100 dark:bg-slate-950/80 transition-all duration-500 overflow-hidden flex items-center justify-center"
          style={{ transform: `scale(${1 + (zoomLevel - 3) * 0.15})` }}
        >
          {/* Abstract Grid Map lines */}
          <div className="absolute inset-0 opacity-10 dark:opacity-20 grid grid-cols-12 grid-rows-8 gap-0 border border-slate-400 dark:border-slate-500">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-slate-400/25 dark:border-slate-500/25"></div>
            ))}
          </div>

          {/* Continents outlines (simulated by fluid vector shapes) */}
          <div className="absolute top-10 left-12 w-64 h-48 rounded-full bg-slate-250/20 dark:bg-slate-800/20 filter blur-xl"></div>
          <div className="absolute bottom-12 right-20 w-80 h-56 rounded-full bg-slate-250/20 dark:bg-slate-800/20 filter blur-2xl"></div>

          {/* Radar Radar Sweeper Animation */}
          {activeLayer === 'radar' && isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[150%] h-[150%] rounded-full border border-green-500/20 dark:border-green-400/10 origin-center animate-spin-slow bg-gradient-to-tr from-green-500/0 via-green-500/5 to-green-500/0"></div>
            </div>
          )}

          {/* Precipitation / Satellite Clouds blobs */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Blurry fluid weather mass blobs that shift when playing */}
            <motion.div 
              animate={isPlaying ? {
                scale: [1, 1.12, 0.98, 1.05, 1],
                x: [0, 15, -10, 8, 0],
                y: [0, -8, 12, -5, 0]
              } : {}}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute h-48 w-48 rounded-full filter blur-xl transition-colors duration-500"
              style={{ 
                backgroundColor: getLayerColor(),
                top: '25%',
                left: '35%'
              }}
            />
            <motion.div 
              animate={isPlaying ? {
                scale: [1, 0.95, 1.08, 0.98, 1],
                x: [0, -10, 15, -8, 0],
                y: [0, 12, -8, 5, 0]
              } : {}}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute h-64 w-64 rounded-full filter blur-2xl transition-colors duration-500"
              style={{ 
                backgroundColor: getLayerColor(),
                bottom: '15%',
                right: '25%'
              }}
            />
          </div>

          {/* Active City Locator tag */}
          <div className="absolute flex flex-col items-center gap-1 z-10">
            <div className="h-3 w-3 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900 shadow-md animate-ping"></div>
            <div className="h-3 w-3 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900 shadow-md absolute"></div>
            <div className="px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200 shadow-sm dark:bg-slate-900/90 dark:border-slate-800 text-[10px] font-extrabold text-slate-800 dark:text-white uppercase select-none">
              {currentCity}
            </div>
          </div>
        </div>

        {/* Map Header overlays */}
        <div className="absolute top-4 left-4 z-10">
          <div className="glass-panel px-3 py-2 rounded-xl border border-slate-200/50 bg-white/75 dark:bg-slate-950/75 shadow-sm">
            <h4 className="text-xs font-bold text-slate-850 dark:text-white">{getMapTitle()}</h4>
            <p className="text-[9px] font-semibold text-slate-450 uppercase mt-0.5">Scale: 1 : 500,000</p>
          </div>
        </div>

        {/* Control bar: play & timeline slider */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-4">
          {/* Play/Pause controls */}
          <div className="glass-panel px-3 py-2 rounded-xl flex items-center gap-3 border border-slate-200/50 bg-white/75 dark:bg-slate-950/75 shadow-sm shrink-0 select-none">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 transition-colors"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            <div className="text-left">
              <span className="text-[9px] text-slate-400 font-extrabold uppercase block">Status</span>
              <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-250">
                {isPlaying ? `Looping (${playbackTime})` : 'Paused'}
              </span>
            </div>
          </div>

          {/* Legend keys overlay */}
          <div className="glass-panel hidden sm:flex items-center gap-3 px-3 py-2 rounded-xl border border-slate-200/50 bg-white/75 dark:bg-slate-950/75 shadow-sm text-[9px] font-bold text-slate-500 uppercase select-none">
            <span>Light</span>
            <div className={`h-2.5 w-24 rounded-full bg-gradient-to-r ${
              activeLayer === 'radar' 
                ? 'from-green-500/20 via-green-500 to-green-800' 
                : activeLayer === 'precipitation' 
                  ? 'from-blue-400 via-blue-600 to-indigo-800' 
                  : 'from-slate-300 via-slate-400 to-slate-100'
            }`}></div>
            <span>Heavy</span>
          </div>

          {/* Zoom Buttons overlay */}
          <div className="glass-panel flex flex-col p-1 rounded-xl border border-slate-200/50 bg-white/75 dark:bg-slate-950/75 shadow-sm shrink-0">
            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev + 1, 5))}
              className="p-1 text-slate-650 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 1, 1))}
              className="p-1 border-t border-slate-200/40 dark:border-slate-800/40 text-slate-655 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
      
    </motion.div>
  );
};

export default WeatherMaps;
