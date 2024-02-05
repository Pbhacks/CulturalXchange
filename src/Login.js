import React, { useState } from 'react';
import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, firestore } from './firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from '@firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './redux/authSlice';
import MyComponent from "./components/ui/PublishedComponent";
import './login.css';
import img1 from "./img/logIn1.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInMode, setIsSignInMode] = useState(true);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const dispatch = useDispatch();
  const setNewUser = (user) => dispatch(setUser(user));
  const user = useSelector((state) => state.auth.user);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const isEmail = /\S+@\S+\.\S+/.test(email);

      if (isEmail) {
        const { user } = await signInWithEmailAndPassword(auth, email, password);

        if (!user.emailVerified) {
          console.log("Email not verified. Please verify your email.");
          return;
        }

        console.log("Login successful");
        setNewUser(user);
      } else {
        console.error("Invalid email format");
        return;
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      let user;

      if (email) {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Access user from userCredential
        user = userCredential.user;

        // Send verification email
        await sendEmailVerification(user);

        console.log("Email verification sent to:", user.email);
        setShowVerificationMessage(true);
      }

      console.log("Signup successful");
      setNewUser(user);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }

    setEmail("");
    setPassword("");
  };

  const addUser = async (user) => {
    const q = query(collection(firestore, "User"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(firestore, "User", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        chatList: [],
      });
      await setDoc(doc(firestore, "ChatList", user.uid), {
        rooms: [],
        user: doc(firestore, "User", user.uid),
      });
      console.log("add user successfully");
      setNewUser({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        chatList: [],
      });
    } else {
      const docSnap = docs.docs[0];

      if (docSnap.exists()) {
        const currentUser = docSnap.data();
        setNewUser(currentUser);
      } else {
        console.log("No such User!");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      console.log("Google login successful");
      const user = res.user;
      await addUser(user);
      setNewUser(user);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleTwitterLogin = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      console.log("Twitter login successful");
      const user = res.user;
      await addUser(user);
    } catch (error) {
      console.error("Error signing in with Twitter:", error.message);
    }
  };
  

  const handleToggleMode = () => {
    setIsSignInMode((prevMode) => !prevMode);
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {user && user.emailVerified ? (
        <MyComponent />
      ) : (
        <div className="section">
          <div className="div-block-2">
            <div className="div-block">
              <img src={img1} alt="" srcset="" />
            </div>
            <div className="div-block-3">
              <div className="w-layout-blockcontainer container w-container">
                <h2 className="heading">
                  {isSignInMode ? "Login Page" : "Sign Up Page"}
                </h2>
                <br />
                <div className="w-form">
                  <div className="form">
                    {isSignInMode ? (
                      <input
                        className="text-field w-input"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    ) : (
                      <input
                        className="text-field w-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    )}
                    <input
                      className="text-field-2 w-input"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {isSignInMode ? (
                      <button
                        className="submit-button w-button"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                    ) : (
                      <button
                        className="submit-button w-button"
                        onClick={handleSignup}
                      >
                        Sign Up
                      </button>
                    )}
                    {isSignInMode ? (
                      <p onClick={handleToggleMode}>
                        <a href="#">Don't have an account? Sign Up</a>
                      </p>
                    ) : showVerificationMessage ? (
                      <p className="verification-message">
                        Please verify your email to proceed then{" "}
                        <a href="#" onClick={handleToggleMode}>
                          LogIn
                        </a>
                      </p>
                    ) : null}
                    <p className="paragraph">OR</p>
                    <div className="div-block-4">
                      <div onClick={handleGoogleLogin}>
                        <img
                          src="https://assets-global.website-files.com/65bdd5d09760d72632451374/65bdfb7e9b85333f539464b8_Group.svg"
                          loading="lazy"
                          alt=""
                          className="login-img"
                        />
                      </div>
                      <div onClick={handleTwitterLogin}>
                        <img
                          src="https://assets-global.website-files.com/65bdd5d09760d72632451374/65bdfb7e7a30057ce99e0055_Group%2048.svg"
                          loading="lazy"
                          alt=""
                          className="login-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
