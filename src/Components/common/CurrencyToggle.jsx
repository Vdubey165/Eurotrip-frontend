// src/components/common/CurrencyToggle.jsx
import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { FaExchangeAlt } from 'react-icons/fa';
import '../../styles/CurrencyToggle.css';

const CurrencyToggle = () => {
  const { currency, toggleCurrency, exchangeRate, isLoading } = useCurrency();

  return (
    <div className="currency-toggle-container">
      <button 
        className="currency-toggle-btn"
        onClick={toggleCurrency}
        disabled={isLoading}
        title={`Switch to ${currency === 'INR' ? 'EUR' : 'INR'}`}
      >
        <FaExchangeAlt className="exchange-icon" />
        <span className="currency-display">
          {currency === 'INR' ? '₹ INR' : '€ EUR'}
        </span>
      </button>
      
      {currency === 'EUR' && (
        <div className="exchange-rate-tooltip">
          1 INR = €{exchangeRate.toFixed(4)}
        </div>
      )}
    </div>
  );
};

export default CurrencyToggle;