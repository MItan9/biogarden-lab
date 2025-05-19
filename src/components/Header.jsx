import React from 'react';
import logo from '../assets/tree.png';

export default function Header({ isDarkMode, toggleTheme }) {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      background: isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
      color: isDarkMode ? 'rgba(2, 152, 80, 0.7)' : 'rgba(3, 46, 25, 0.7)',
    }}>

        <div style={{ display: 'flex',  gap: '0.5rem' }}>
            
        <img
          src={logo}
          alt="BioGarden logo"
          style={{ height: '80px', width: '90px', marginLeft: '1rem' }}
        />
      <h1 style={{ marginTop: '2.85rem' }}> BioGarden</h1>
       </div>
      <button
        onClick={toggleTheme}
        style={{
          padding: '0.5rem 1rem',
          background: 'none',
          border: '1px solid currentColor',
          borderColor: 'transparent',
          cursor: 'pointer',
          color: isDarkMode ? '#fff' : '#000',
          fontSize: '1.5rem',
        }}
      >
        {isDarkMode ? '🌙' : '🌞'}
      </button>
    </header>
  );
}
