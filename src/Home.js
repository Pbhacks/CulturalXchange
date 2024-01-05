// src/Home.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from './Navbar';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? '#2c3e50' : '#ecf0f1')};
    color: ${(props) => (props.darkMode ? '#ecf0f1' : '#2c3e50')};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const DarkModeToggle = styled.div`
  cursor: pointer;
  padding: 10px;
`;

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <GlobalStyle darkMode={darkMode} />
      <Header>
        <DarkModeToggle onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="2x" />
        </DarkModeToggle>
      </Header>
      <h2>Home Page</h2>
      <p>This is the content of your home page.</p>
    </div>
  );
};

export default Home;
