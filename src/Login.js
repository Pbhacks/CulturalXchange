// src/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { faGoogle as faGoogleBrand, faFacebook as faFacebookBrand } from '@fortawesome/free-brands-svg-icons';
import styled, { createGlobalStyle } from 'styled-components';
import auth from './firebase';
import Navbar from './Navbar';
import MainPage from './MainPage'; // Import MainPage component
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? '#2c3e50' : 'linear-gradient(to bottom, #ff8080, #ff99cc)')};
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      setUser(auth.currentUser);
    } catch (error) {
      console.error('Error signing in:', error.message);
    }

    // Clear the form fields after submission
    setEmail('');
    setPassword('');
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Sign in with Google Popup
      await signInWithPopup(auth, provider);
      console.log('Google login successful');
      setUser(auth.currentUser);
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      // Sign in with Facebook Popup
      await signInWithPopup(auth, provider);
      console.log('Facebook login successful');
      setUser(auth.currentUser);
    } catch (error) {
      console.error('Error signing in with Facebook:', error.message);
    }
  };

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
      {user ? (
        <MainPage />
      ) : (
        <div>
          <h2>Login Page</h2>
          <form onSubmit={handleLogin}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit">Login</button>
          </form>

          <div>
            <FontAwesomeIcon icon={faGoogleBrand} onClick={handleGoogleLogin} style={{ cursor: 'pointer', marginRight: '10px' }} />
            <FontAwesomeIcon icon={faFacebookBrand} onClick={handleFacebookLogin} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
