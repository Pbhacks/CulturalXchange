// src/Login.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle as faGoogleBrand,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import styled, { createGlobalStyle } from "styled-components";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { auth, firestore } from "./firebase";
import MainPage from "./components/MainPage/MainPage";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? "#2c3e50" : "#ecf0f1")};
    color: ${(props) => (props.darkMode ? "#ecf0f1" : "#2c3e50")};
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      setUser(auth.currentUser);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }

    setEmail("");
    setPassword("");
  };

  const addUser = async (user) => {
    const q = query(
      collection(firestore, "User"),
      where("uid", "==", user.uid)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(firestore, "User"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        chatList: [],
      });
      console.log("add user successfully");
      setUser({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        chatList: [],
      });
    } else {
      setUser(docs.docs[0]);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      console.log("Google login successful");
      const user = res.user;
      await addUser(user);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleTwitterLogin = async () => {
    const provider = new TwitterAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Twitter login successful");
      setUser(auth.currentUser);
    } catch (error) {
      console.error("Error signing in with Twitter:", error.message);
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
          <div className="blur-box">
            <h2>Login Page</h2>
            <FontAwesomeIcon
              icon={faGoogleBrand}
              onClick={handleGoogleLogin}
              style={{
                cursor: "pointer",
                marginRight: "10px",
                fontSize: "2rem",
              }}
            />
            <FontAwesomeIcon
              icon={faTwitter}
              onClick={handleTwitterLogin}
              style={{ cursor: "pointer", fontSize: "2rem" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
