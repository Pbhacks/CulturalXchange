// src/Login.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle as faGoogleBrand,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { auth, firestore } from "./firebase";
import MainPage from "./components/MainPage/MainPage";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  return (
    <div>
      {user ? (
        <MainPage />
      ) : (
        <div>
          <div className="element">
            <h2>Login Page</h2><br></br>
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
