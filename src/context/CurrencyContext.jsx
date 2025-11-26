// src/context/CurrencyContext.js
// src/context/CurrencyContext.js - SECURE VERSION
import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR'); // 'INR' or 'EUR'
  const [exchangeRate, setExchangeRate] = useState(0.011); // Default: 1 INR ≈ 0.011 EUR
  const [isLoading, setIsLoading] = useState(false);

  // Get API key from environment variable
  const API_KEY = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;

  // Fetch live exchange rate
  const fetchExchangeRate = async () => {
    // Check if API key exists
    if (!API_KEY) {
      console.warn('Exchange Rate API key not configured. Using default rate.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/INR`
      );
      const data = await response.json();
      
      if (data.result === 'success') {
        setExchangeRate(data.conversion_rates.EUR);
        console.log('Exchange rate updated:', data.conversion_rates.EUR);
      } else {
        console.error('API Error:', data);
      }
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      // Keep using default rate on error
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch rate on mount
  useEffect(() => {
    if (API_KEY) {
      fetchExchangeRate();
    }
  }, []);

  // Toggle between INR and EUR
  const toggleCurrency = () => {
    setCurrency(prev => prev === 'INR' ? 'EUR' : 'INR');
  };

  // Convert amount based on current currency
  const convertPrice = (priceInINR) => {
    if (!priceInINR) return 0;
    if (currency === 'INR') {
      return priceInINR;
    }
    // Convert to EUR
    return Math.round(priceInINR * exchangeRate);
  };

  // Format price with currency symbol
  const formatPrice = (priceInINR, showDecimals = false) => {
    const converted = convertPrice(priceInINR);
    
    if (currency === 'INR') {
      return `₹${converted.toLocaleString('en-IN')}`;
    } else {
      if (showDecimals) {
        return `€${converted.toLocaleString('en-EU', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })}`;
      }
      return `€${converted.toLocaleString('en-EU')}`;
    }
  };

  // Get currency symbol
  const getCurrencySymbol = () => {
    return currency === 'INR' ? '₹' : '€';
  };

  // Get currency code
  const getCurrencyCode = () => {
    return currency;
  };

  const value = {
    currency,
    exchangeRate,
    isLoading,
    toggleCurrency,
    convertPrice,
    formatPrice,
    getCurrencySymbol,
    getCurrencyCode,
    fetchExchangeRate
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};