import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Clock, Search, Map, Settings } from 'lucide-react';

const BottomNavigation = () => {
  const menuItems = [
    { name: 'Home', path: '/', icon: LayoutDashboard },
    { name: '7-Day', path: '/forecast', icon: Calendar },
    { name: 'Hourly', path: '/hourly', icon: Clock },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Map', path: '/map', icon: Map },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-slate-200/50 bg-white/70 backdrop-blur-xl dark:border-slate-800/30 dark:bg-slate-950/70 flex items-center justify-around px-2 z-30 lg:hidden shadow-lg">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1.5 w-12 h-12 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'text-blue-500 dark:text-blue-400 font-bold'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-medium tracking-tight truncate w-full text-center">{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
