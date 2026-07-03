import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Forecast7Day from './pages/Forecast7Day';
import HourlyForecast from './pages/HourlyForecast';
import SearchWeather from './pages/SearchWeather';
import WeatherMaps from './pages/WeatherMaps';
import SettingsPage from './pages/Settings';

function App() {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="forecast" element={<Forecast7Day />} />
            <Route path="hourly" element={<HourlyForecast />} />
            <Route path="search" element={<SearchWeather />} />
            <Route path="map" element={<WeatherMaps />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WeatherProvider>
  );
}

export default App;
