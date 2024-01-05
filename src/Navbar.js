// src/Navbar.js
import React, { useState } from 'react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  };

  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </nav>
  );
};

export default Navbar;
