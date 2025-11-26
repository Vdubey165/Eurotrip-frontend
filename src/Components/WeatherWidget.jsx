// src/components/WeatherWidget.jsx
import React, { useEffect, useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { FaTemperatureHigh, FaWind, FaTint, FaSpinner } from 'react-icons/fa';
import '../styles/WeatherWidget.css';

const WeatherWidget = ({ city, compact = false }) => {
  const { fetchWeather, getCachedWeather, isLoading, getWeatherEmoji } = useWeather();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadWeather = async () => {
      if (!city) return;
      
      // Check cache first
      const cached = getCachedWeather(city);
      if (cached) {
        setWeather(cached);
        return;
      }

      // Fetch new data
      try {
        const data = await fetchWeather(city);
        if (data) {
          setWeather(data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(true);
      }
    };

    loadWeather();
  }, [city, fetchWeather, getCachedWeather]);

  if (!city) return null;
  
  if (isLoading && !weather) {
    return (
      <div className={`weather-widget ${compact ? 'compact' : ''}`}>
        <FaSpinner className="weather-spinner" />
      </div>
    );
  }

  if (error || !weather) {
    return null; // Silently fail
  }

  if (compact) {
    // Compact version for cards
    return (
      <div className="weather-widget compact">
        <span className="weather-emoji">{getWeatherEmoji(weather.current.description)}</span>
        <span className="weather-temp">{weather.current.temp}°C</span>
        <span className="weather-desc">{weather.current.description}</span>
      </div>
    );
  }

  // Full version for destination pages
  return (
    <div className="weather-widget full">
      <div className="weather-header">
        <h4>Current Weather in {weather.city}</h4>
      </div>
      
      <div className="weather-current">
        <div className="weather-main">
          <span className="weather-emoji-large">
            {getWeatherEmoji(weather.current.description)}
          </span>
          <div className="weather-temp-large">
            <span className="temp-value">{weather.current.temp}</span>
            <span className="temp-unit">°C</span>
          </div>
          <p className="weather-description">{weather.current.description}</p>
        </div>

        <div className="weather-details">
          <div className="weather-detail-item">
            <FaTemperatureHigh className="detail-icon" />
            <span>Feels like {weather.current.feelsLike}°C</span>
          </div>
          <div className="weather-detail-item">
            <FaTint className="detail-icon" />
            <span>Humidity {weather.current.humidity}%</span>
          </div>
          <div className="weather-detail-item">
            <FaWind className="detail-icon" />
            <span>Wind {weather.current.windSpeed} m/s</span>
          </div>
        </div>
      </div>

      {weather.forecast && weather.forecast.length > 0 && (
        <div className="weather-forecast">
          <h5>5-Day Forecast</h5>
          <div className="forecast-grid">
            {weather.forecast.map((day, idx) => (
              <div key={idx} className="forecast-day">
                <p className="forecast-date">
                  {day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
                <span className="forecast-emoji">
                  {getWeatherEmoji(day.description)}
                </span>
                <p className="forecast-temp">
                  {day.tempMax}° / {day.tempMin}°
                </p>
                <p className="forecast-desc">{day.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;