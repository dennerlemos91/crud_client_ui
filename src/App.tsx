import React from 'react';
import './App.css'
import Routes from './routes'
import { AuthProvider } from './hooks/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
