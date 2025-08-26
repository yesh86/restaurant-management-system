
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthenticatedApp from './AuthenticatedApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticatedApp />
  </React.StrictMode>
);