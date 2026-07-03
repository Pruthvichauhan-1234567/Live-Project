import React, { createContext, useState, useEffect, useContext } from 'react';
import weatherDatabase from '../data/weatherData.json';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  // 1. Initial State from LocalStorage or Defaults
  const [currentCity, setCurrentCity] = useState(() => {
    return localStorage.getItem('weather_city') || 'New York';
  });

  const [tempUnit, setTempUnitState] = useState(() => {
    return localStorage.getItem('weather_temp_unit') || 'C';
  });

  const [windSpeedUnit, setWindSpeedUnitState] = useState(() => {
    return localStorage.getItem('weather_wind_unit') || 'km/h';
  });

  const [theme, setThemeState] = useState(() => {
    const savedTheme = localStorage.getItem('weather_theme');
    if (savedTheme) return savedTheme;
    // Default to dark mode for modern aesthetics
    return 'dark';
  });

  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('weather_recent_searches');
    return saved ? JSON.parse(saved) : ['Tokyo', 'London', 'Sydney'];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weather_favorites');
    return saved ? JSON.parse(saved) : ['New York', 'Tokyo', 'London'];
  });

  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('weather_lang') || 'en';
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('weather_notifications');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Loading simulation state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Apply theme class to HTML element on mount and change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('weather_theme', theme);
  }, [theme]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('weather_city', currentCity);
  }, [currentCity]);

  useEffect(() => {
    localStorage.setItem('weather_recent_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem('weather_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Actions
  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const changeCity = (cityName) => {
    // Normalize casing for matching mock data
    const matchedCity = Object.keys(weatherDatabase).find(
      key => key.toLowerCase() === cityName.trim().toLowerCase()
    );

    if (matchedCity) {
      setLoading(true);
      setError(null);
      
      // Simulate network request loading time
      setTimeout(() => {
        setCurrentCity(matchedCity);
        // Add to recent searches (prevent duplicates, keep top 5)
        setRecentSearches(prev => {
          const filtered = prev.filter(c => c.toLowerCase() !== matchedCity.toLowerCase());
          return [matchedCity, ...filtered].slice(0, 5);
        });
        setLoading(false);
      }, 600);
      return true;
    } else {
      setError(`City "${cityName}" not found. Try searching Tokyo, London, Mumbai, Sydney, Cairo, or New York.`);
      return false;
    }
  };

  const setTempUnit = (unit) => {
    setTempUnitState(unit);
    localStorage.setItem('weather_temp_unit', unit);
  };

  const setWindSpeedUnit = (unit) => {
    setWindSpeedUnitState(unit);
    localStorage.setItem('weather_wind_unit', unit);
  };

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('weather_lang', lang);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(prev => {
      const next = !prev;
      localStorage.setItem('weather_notifications', JSON.stringify(next));
      return next;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeRecentSearch = (cityToRemove) => {
    setRecentSearches(prev => prev.filter(c => c !== cityToRemove));
  };

  const toggleFavorite = (cityName) => {
    setFavorites(prev => {
      if (prev.includes(cityName)) {
        return prev.filter(c => c !== cityName);
      } else {
        return [...prev, cityName];
      }
    });
  };

  // Convert temperature helper
  const convertTemp = (tempInCelsius) => {
    if (tempUnit === 'F') {
      return Math.round((tempInCelsius * 9) / 5 + 32);
    }
    return Math.round(tempInCelsius);
  };

  // Convert wind speed helper
  const convertWind = (speedInKmh) => {
    if (windSpeedUnit === 'mph') {
      return `${Math.round(speedInKmh * 0.621371)} mph`;
    }
    if (windSpeedUnit === 'm/s') {
      return `${Math.round(speedInKmh / 3.6)} m/s`;
    }
    return `${Math.round(speedInKmh)} km/h`;
  };

  // Get current city weather data
  const weatherData = weatherDatabase[currentCity] || weatherDatabase['New York'];

  // All available cities in our mock database (for suggestions)
  const availableCities = Object.keys(weatherDatabase);

  return (
    <WeatherContext.Provider
      value={{
        currentCity,
        weatherData,
        availableCities,
        tempUnit,
        windSpeedUnit,
        theme,
        recentSearches,
        favorites,
        language,
        notificationsEnabled,
        loading,
        error,
        changeCity,
        toggleTheme,
        setTempUnit,
        setWindSpeedUnit,
        setLanguage,
        toggleNotifications,
        clearRecentSearches,
        removeRecentSearch,
        toggleFavorite,
        convertTemp,
        convertWind,
        setError
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
