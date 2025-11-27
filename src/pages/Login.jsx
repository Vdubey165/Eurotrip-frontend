import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaDatabase,
  FaChartBar,
  FaMapMarkerAlt,
  FaSync
} from 'react-icons/fa';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, setError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(formData);
    
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>Welcome Back!</h1>
          <p>Login to continue planning your Europe adventure</p>
        </div>

        {error && (
          <div className="error-message">
            <FaExclamationCircle /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="input-icon" /> Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="input-icon" /> Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? 
            <Link to="/register"> Register here</Link>
          </p>
        </div>
      </div>

      <div className="auth-features">
        <h3>Why login?</h3>
        <ul>
          <li><FaDatabase className="feature-icon" /> Save your trip plans</li>
          <li><FaChartBar className="feature-icon" /> Track your budget across devices</li>
          <li><FaMapMarkerAlt className="feature-icon" /> Access your itinerary anywhere</li>
          <li><FaSync className="feature-icon" /> Sync across all your devices</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;