import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import { useWeather } from '../context/WeatherContext';
import { Search, AlertCircle } from 'lucide-react';

const DashboardLayout = () => {
  const { weatherData, theme, error, changeCity, setError } = useWeather();
  const [mobileSearchVal, setMobileSearchVal] = React.useState('');

  // Choose a rich gradient based on current weather condition
  const getBgGradient = () => {
    if (!weatherData) return theme === 'dark' ? 'from-slate-900 via-indigo-950 to-slate-950' : 'from-slate-50 via-sky-50 to-slate-100';
    
    const condition = weatherData.current.condition.toLowerCase();
    
    if (theme === 'dark') {
      if (condition.includes('sunny')) {
        return 'from-amber-950/30 via-indigo-950/40 to-slate-950';
      }
      if (condition.includes('rain') || condition.includes('drizzle')) {
        return 'from-blue-950/40 via-slate-900/60 to-slate-950';
      }
      if (condition.includes('thunderstorm') || condition.includes('lightning')) {
        return 'from-purple-950/45 via-slate-900/60 to-slate-950';
      }
      if (condition.includes('wind')) {
        return 'from-teal-950/30 via-zinc-900/50 to-slate-950';
      }
      // Cloudy/others
      return 'from-slate-900 via-indigo-950/30 to-slate-950';
    } else {
      // Light Mode gradients
      if (condition.includes('sunny')) {
        return 'from-amber-50/70 via-blue-50/30 to-cyan-100/40';
      }
      if (condition.includes('rain') || condition.includes('drizzle')) {
        return 'from-blue-50/70 via-slate-100/50 to-indigo-50/70';
      }
      if (condition.includes('thunderstorm') || condition.includes('lightning')) {
        return 'from-purple-50/60 via-slate-100/40 to-indigo-50/60';
      }
      if (condition.includes('wind')) {
        return 'from-teal-50/50 via-zinc-100/30 to-slate-50/50';
      }
      return 'from-slate-50 via-sky-50/40 to-slate-100/50';
    }
  };

  const handleMobileSearch = (e) => {
    e.preventDefault();
    if (!mobileSearchVal.trim()) return;
    const success = changeCity(mobileSearchVal.trim());
    if (success) {
      setMobileSearchVal('');
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBgGradient()} transition-colors duration-1000`}>
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Main Panel Wrapper */}
      <div className="flex flex-col min-h-screen lg:pl-64">
        
        {/* Navbar */}
        <Navbar />

        {/* Floating Error Bar */}
        {error && (
          <div className="mx-4 md:mx-8 mt-24 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-xs font-semibold flex items-center justify-between shadow-sm animate-pulse z-10">
            <span className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </span>
            <button onClick={() => setError(null)} className="font-bold hover:scale-110 ml-2">
              Close
            </button>
          </div>
        )}

        {/* Mobile Search input (displayed on small screens since header collapses search) */}
        <div className="sm:hidden px-4 mt-24">
          <form onSubmit={handleMobileSearch} className="relative">
            <input
              type="text"
              placeholder="Search city (e.g. London, Tokyo...)"
              value={mobileSearchVal}
              onChange={(e) => {
                setMobileSearchVal(e.target.value);
                setError(null);
              }}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200/60 bg-white/50 dark:bg-slate-900/30 dark:border-slate-800/60 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          </form>
        </div>

        {/* Main Content Area */}
        <main className={`flex-1 p-4 md:p-8 pb-24 lg:pb-8 ${error || mobileSearchVal !== '' ? 'mt-2' : 'mt-20'}`}>
          <Outlet />
        </main>
      </div>

      {/* Bottom Nav for Mobile/Tablet */}
      <BottomNavigation />
    </div>
  );
};

export default DashboardLayout;
