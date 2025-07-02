import React from 'react';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/common/MainLayout';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <div className="min-h-screen bg-gradient-to-br from-amber-25 via-orange-25 to-yellow-25">
          <MainLayout />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;