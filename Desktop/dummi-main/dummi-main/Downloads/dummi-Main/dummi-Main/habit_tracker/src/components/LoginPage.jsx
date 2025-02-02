import React, { useState, useCallback, memo } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = memo(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, login, navigate]);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    setError('');
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
    setError('');
  }, []);

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <h2 style={{ textAlign: 'center', color: '#4C489D', marginBottom: '20px' }}>Login</h2>
          <form className="login" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input 
                type="text" 
                className={`login__input ${error ? 'error' : ''}`}
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input 
                type="password" 
                className={`login__input ${error ? 'error' : ''}`}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                required
              />
            </div>
            <button 
              className={`button login__submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              <span className="button__text">
                {isLoading ? 'Logging in...' : 'Log In'}
              </span>
              {!isLoading && <i className="button__icon fas fa-chevron-right"></i>}
            </button>
          </form>
          <div className="social-login">
            <span>New to habit tracker? </span>
            <Link to="/signup" className="login-link">Sign up</Link>
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

export default LoginPage;
