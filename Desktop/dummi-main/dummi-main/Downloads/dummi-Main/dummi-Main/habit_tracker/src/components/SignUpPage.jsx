import React, { useState, useCallback, memo } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const SignUpPage = memo(() => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useUser();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    } else if (formData.username.length > 30) {
      newErrors.username = 'Username cannot exceed 30 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    try {
      await signup(formData.username, formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
    } finally {
      setIsLoading(false);
    }
  }, [formData, signup, navigate]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <h2 style={{ textAlign: 'center', color: '#4C489D', marginBottom: '20px' }}>Sign Up</h2>
          <form className="login" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="error-message">{errors.submit}</div>
            )}
            
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input 
                type="text"
                className={`login__input ${errors.username ? 'error' : ''}`}
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              {errors.username && (
                <div className="field-error">{errors.username}</div>
              )}
            </div>

            <div className="login__field">
              <i className="login__icon fas fa-envelope"></i>
              <input 
                type="email"
                className={`login__input ${errors.email ? 'error' : ''}`}
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              {errors.email && (
                <div className="field-error">{errors.email}</div>
              )}
            </div>

            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input 
                type="password"
                className={`login__input ${errors.password ? 'error' : ''}`}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              {errors.password && (
                <div className="field-error">{errors.password}</div>
              )}
            </div>

            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input 
                type="password"
                className={`login__input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              {errors.confirmPassword && (
                <div className="field-error">{errors.confirmPassword}</div>
              )}
            </div>

            <button 
              type="submit" 
              className={`button login__submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              <span className="button__text">
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </span>
              {!isLoading && <i className="button__icon fas fa-chevron-right"></i>}
            </button>
          </form>
          
          <div className="social-login">
            <span>Already have an account?</span>
            <Link to="/login" className="login-link">Login</Link>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
});

export default SignUpPage;
