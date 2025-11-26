// src/context/WeatherContext.js - SECURE VERSION
import React, { createContext, useContext, useState, useCallback } from 'react';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [weatherCache, setWeatherCache] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Get API key from environment variable
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // City name mapping for better API results
  const cityMapping = {
    'Paris': { name: 'Paris', country: 'FR' },
    'London': { name: 'London', country: 'GB' },
    'Rome': { name: 'Rome', country: 'IT' },
    'Berlin': { name: 'Berlin', country: 'DE' },
    'Barcelona': { name: 'Barcelona', country: 'ES' },
    'Munich': { name: 'Munich', country: 'DE' },
    'Amsterdam': { name: 'Amsterdam', country: 'NL' }
  };

  // Fetch weather for a specific city
  const fetchWeather = useCallback(async (cityName) => {
    // Check if API key exists
    if (!API_KEY) {
      console.warn('OpenWeather API key not configured. Weather feature disabled.');
      return null;
    }

    // Check cache first
    if (weatherCache[cityName]) {
      const cached = weatherCache[cityName];
      const cacheAge = Date.now() - cached.timestamp;
      // Cache for 1 hour (3600000 ms)
      if (cacheAge < 3600000) {
        return cached.data;
      }
    }

    try {
      setIsLoading(true);
      
      const cityInfo = cityMapping[cityName] || { name: cityName, country: '' };
      const query = cityInfo.country 
        ? `${cityInfo.name},${cityInfo.country}`
        : cityInfo.name;

      // Fetch current weather + 5-day forecast
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}&units=metric`
        )
      ]);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('Weather API request failed');
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      // Process forecast data (get daily forecasts at noon)
      const dailyForecasts = forecastData.list
        .filter(item => item.dt_txt.includes('12:00:00'))
        .slice(0, 5)
        .map(item => ({
          date: new Date(item.dt * 1000),
          temp: Math.round(item.main.temp),
          tempMin: Math.round(item.main.temp_min),
          tempMax: Math.round(item.main.temp_max),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed
        }));

      const weatherData = {
        current: {
          temp: Math.round(currentData.main.temp),
          feelsLike: Math.round(currentData.main.feels_like),
          tempMin: Math.round(currentData.main.temp_min),
          tempMax: Math.round(currentData.main.temp_max),
          description: currentData.weather[0].description,
          icon: currentData.weather[0].icon,
          humidity: currentData.main.humidity,
          windSpeed: currentData.wind.speed,
          cloudiness: currentData.clouds.all,
          sunrise: new Date(currentData.sys.sunrise * 1000),
          sunset: new Date(currentData.sys.sunset * 1000)
        },
        forecast: dailyForecasts,
        city: currentData.name,
        country: currentData.sys.country
      };

      // Cache the result
      setWeatherCache(prev => ({
        ...prev,
        [cityName]: {
          data: weatherData,
          timestamp: Date.now()
        }
      }));

      return weatherData;
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [weatherCache, API_KEY]);

  // Get weather icon URL
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Get weather emoji based on description
  const getWeatherEmoji = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('thunder')) return '⛈️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    if (desc.includes('wind')) return '💨';
    return '🌤️';
  };

  // Get cached weather (without fetching)
  const getCachedWeather = (cityName) => {
    return weatherCache[cityName]?.data || null;
  };

  const value = {
    weatherCache,
    isLoading,
    fetchWeather,
    getWeatherIconUrl,
    getWeatherEmoji,
    getCachedWeather
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};