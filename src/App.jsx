import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import NotificationManager from "./components/NotificationManager";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
        zIndex: -1
      }} />

      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

    
      <main style={{ padding: '1rem', position: 'relative', zIndex: 1 }}>
        <NotificationManager />
      </main>
    </div>
  );
}

export default App;
