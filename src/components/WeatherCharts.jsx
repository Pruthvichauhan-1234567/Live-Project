import React, { useState, useRef } from 'react';
import { useWeather } from '../context/WeatherContext';
import { Thermometer, CloudRain, Droplet, Wind } from 'lucide-react';

const WeatherCharts = () => {
  const { weatherData, convertTemp, tempUnit } = useWeather();
  const [activeTab, setActiveTab] = useState('temp'); // 'temp', 'rain', 'humidity', 'wind'
  const [hoverIndex, setHoverIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  if (!weatherData) return null;

  const hourlyData = weatherData.hourly;

  // Tabs definitions
  const tabs = [
    { id: 'temp', label: 'Temperature', icon: Thermometer, color: 'text-amber-500', activeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
    { id: 'rain', label: 'Rain Chance', icon: CloudRain, color: 'text-blue-500', activeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
    { id: 'humidity', label: 'Humidity', icon: Droplet, color: 'text-teal-505', activeClass: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20' },
    { id: 'wind', label: 'Wind Speed', icon: Wind, color: 'text-sky-505', activeClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20' },
  ];

  // Extraction of values and scaling limits
  const points = hourlyData.map((d, index) => {
    let value = 0;
    let label = '';
    if (activeTab === 'temp') {
      value = convertTemp(d.temp);
      label = `${value}°${tempUnit}`;
    } else if (activeTab === 'rain') {
      value = d.rainProb;
      label = `${value}%`;
    } else if (activeTab === 'humidity') {
      value = d.humidity;
      label = `${value}%`;
    } else if (activeTab === 'wind') {
      value = d.windSpeed;
      label = `${value} km/h`;
    }
    return { time: d.time, value, label, rawObj: d };
  });

  const values = points.map(p => p.value);
  const maxVal = Math.max(...values, 1);
  const minVal = Math.min(...values, 0);
  const range = maxVal - minVal;

  // Chart Layout Sizing
  const width = 1000;
  const height = 280;
  const padding = 40;

  // Convert data points to SVG coordinates
  const svgPoints = points.map((p, i) => {
    const x = padding + (i / (points.length - 1)) * (width - 2 * padding);
    // Invert Y axis for screen coordinates
    const y = height - padding - ((p.value - minVal) / (range || 1)) * (height - 2 * padding);
    return { ...p, x, y, index: i };
  });

  // Create SVG path string for lines
  const createLinePath = (coords) => {
    if (coords.length === 0) return '';
    return coords.reduce((acc, curr, idx) => {
      if (idx === 0) return `M ${curr.x} ${curr.y}`;
      
      // Bezier curve calculations for smoothness
      const prev = coords[idx - 1];
      const cpX1 = prev.x + (curr.x - prev.x) / 2;
      const cpY1 = prev.y;
      const cpX2 = prev.x + (curr.x - prev.x) / 2;
      const cpY2 = curr.y;
      
      return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
    }, '');
  };

  // Create gradient fill path
  const createAreaPath = (coords) => {
    const linePath = createLinePath(coords);
    if (!linePath) return '';
    const first = coords[0];
    const last = coords[coords.length - 1];
    return `${linePath} L ${last.x} ${height - padding} L ${first.x} ${height - padding} Z`;
  };

  // Handle Mouse Hover movements
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert pixel X into SVG domain X
    const svgX = (x / rect.width) * width;
    
    // Find nearest point
    let closestIndex = 0;
    let minDistance = Infinity;

    svgPoints.forEach((pt, idx) => {
      const dist = Math.abs(pt.x - svgX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    setHoverIndex(closestIndex);
    
    // Scale positioning of tooltip HTML overlay
    const pt = svgPoints[closestIndex];
    const tooltipX = (pt.x / width) * rect.width;
    const tooltipY = (pt.y / height) * rect.height;
    
    setTooltipPos({ x: tooltipX, y: tooltipY });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const activeColorTheme = () => {
    switch (activeTab) {
      case 'temp': return { stroke: '#f59e0b', fill: 'url(#gradient-temp)', label: 'Temp' };
      case 'rain': return { stroke: '#3b82f6', fill: 'url(#gradient-rain)', label: 'Rain' };
      case 'humidity': return { stroke: '#0d9488', fill: 'url(#gradient-humidity)', label: 'Humidity' };
      case 'wind': return { stroke: '#0284c7', fill: 'url(#gradient-wind)', label: 'Wind Speed' };
      default: return { stroke: '#3b82f6', fill: 'url(#gradient-rain)', label: '' };
    }
  };

  const currentTheme = activeColorTheme();

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-md select-none">
      
      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-200/35 dark:border-slate-800/25 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-805 dark:text-white">Hourly Trends</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">24-hour meteorological charts</p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-100/40 border border-slate-250/20 dark:bg-slate-900/40 dark:border-slate-800/45">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setHoverIndex(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? tab.activeClass + ' border shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div 
        ref={containerRef}
        className="relative w-full h-[280px] cursor-crosshair overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
        >
          {/* Defs containing gradients */}
          <defs>
            <linearGradient id="gradient-temp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="gradient-rain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="gradient-humidity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="gradient-wind" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((r, idx) => {
            const y = padding + r * (height - 2 * padding);
            return (
              <line
                key={idx}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                className="stroke-slate-200/40 dark:stroke-slate-800/30"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
            );
          })}

          {/* Draw chart shape */}
          {activeTab === 'rain' ? (
            /* Bar Chart for Rain probability */
            svgPoints.map((pt, idx) => {
              const barWidth = 14;
              const barHeight = height - padding - pt.y;
              return (
                <rect
                  key={idx}
                  x={pt.x - barWidth / 2}
                  y={pt.y}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  className={`transition-all duration-300 ${
                    hoverIndex === idx 
                      ? 'fill-blue-500' 
                      : 'fill-blue-500/40 dark:fill-blue-500/25'
                  }`}
                />
              );
            })
          ) : (
            /* Smooth curve area fill + line */
            <>
              {/* Shaded Area underneath curve */}
              <path
                d={createAreaPath(svgPoints)}
                fill={currentTheme.fill}
                className="transition-all duration-700"
              />
              {/* Outer stroke line */}
              <path
                d={createLinePath(svgPoints)}
                fill="none"
                stroke={currentTheme.stroke}
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </>
          )}

          {/* Render dot nodes on line */}
          {activeTab !== 'rain' && svgPoints.map((pt, idx) => {
            const isHovered = hoverIndex === idx;
            return (
              <circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 6 : 2}
                fill={currentTheme.stroke}
                className="transition-all duration-150 stroke-white dark:stroke-slate-900"
                strokeWidth={isHovered ? 2 : 0}
              />
            );
          })}

          {/* Vertical cursor guide line when hovering */}
          {hoverIndex !== null && (
            <line
              x1={svgPoints[hoverIndex].x}
              y1={padding}
              x2={svgPoints[hoverIndex].x}
              y2={height - padding}
              className="stroke-slate-400/50 dark:stroke-slate-500/30"
              strokeWidth="2"
              strokeDasharray="2 2"
            />
          )}

          {/* Time text markers on bottom x-axis */}
          {svgPoints.filter((_, idx) => idx % 3 === 0).map((pt, idx) => (
            <text
              key={idx}
              x={pt.x}
              y={height - 12}
              textAnchor="middle"
              className="fill-slate-400 dark:fill-slate-500 font-bold text-[9px] uppercase tracking-tighter"
            >
              {pt.time}
            </text>
          ))}
        </svg>

        {/* Dynamic Tooltip absolute positioned HTML layer */}
        {hoverIndex !== null && (
          <div 
            className="absolute glass-panel p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800/80 shadow-md text-[11px] font-bold text-slate-700 dark:text-slate-250 pointer-events-none transition-all duration-100 ease-out z-10"
            style={{ 
              left: `${Math.min(tooltipPos.x + 15, containerRef.current.clientWidth - 110)}px`,
              top: `${Math.min(tooltipPos.y - 45, containerRef.current.clientHeight - 60)}px`
            }}
          >
            <p className="text-[10px] text-slate-400 font-extrabold uppercase">{svgPoints[hoverIndex].time}</p>
            <p className="text-xs mt-0.5 flex items-center gap-1.5">
              <span className={`inline-block h-2 w-2 rounded-full`} style={{ backgroundColor: currentTheme.stroke }}></span>
              <span>{currentTheme.label}: {svgPoints[hoverIndex].label}</span>
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default WeatherCharts;
