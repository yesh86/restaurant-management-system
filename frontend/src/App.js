
import React from 'react';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/common/MainLayout';
import './App.css';

function App() {
  // Create logout function that can be called from MainLayout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('loginTime');
    window.location.reload(); // Reload to show login page
  };

  return (
    <AppProvider>
      <div className="App">
        <div className="min-h-screen bg-gradient-to-br from-amber-25 via-orange-25 to-yellow-25">
          <MainLayout onLogout={handleLogout} />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;