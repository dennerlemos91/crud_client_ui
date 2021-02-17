import React from 'react';
import './App.css'
import { Router } from 'react-router-dom';
import Routes from './routes'
import { AuthProvider } from './hooks/AuthContext';

import history from './routes/history';

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
