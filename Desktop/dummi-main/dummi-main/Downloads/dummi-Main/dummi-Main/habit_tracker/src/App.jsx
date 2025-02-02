import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { CustomThemeProvider } from './context/ThemeContext';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import './styles/App.css';

// Lazy load AppContent
const AppContent = React.lazy(() => import('./components/AppContent'));

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CustomThemeProvider>
          <Suspense fallback={
            <div className="loading-spinner">
              Loading...
            </div>
          }>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/*" element={<AppContent />} />
            </Routes>
          </Suspense>
        </CustomThemeProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
