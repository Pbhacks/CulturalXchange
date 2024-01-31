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
  createUserWithEmailAndPassword, // Import createUserWithEmailAndPassword
} from "firebase/auth";
import { auth, firestore } from "./firebase";
import MainPage from "./components/MainPage/MainPage";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/authSlice";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInMode, setIsSignInMode] = useState(true); // Track login or signup mode
  const dispatch = useDispatch();
  const setNewUser = (user) => dispatch(setUser(user));
  const user = useSelector((state) => state.auth.user);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const isEmail = /\S+@\S+\.\S+/.test(emailOrPhone);
      const isPhone = /^\d{10}$/.test(emailOrPhone);

      if (isEmail) {
        await signInWithEmailAndPassword(auth, emailOrPhone, password);
      } else if (isPhone) {
        // Implement phone number authentication (if needed)
        // Example: const confirmationResult = await sendSignInLinkToEmail(auth, emailOrPhone);
      } else {
        console.error("Invalid email or phone number format");
        return;
      }

      console.log("Login successful");
      setNewUser(auth.currentUser);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }

    setEmailOrPhone("");
    setPassword("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const isEmail = /\S+@\S+\.\S+/.test(emailOrPhone);
      const isPhone = /^\d{10}$/.test(emailOrPhone);

      if (isEmail) {
        await createUserWithEmailAndPassword(auth, emailOrPhone, password);
      } else if (isPhone) {
        // Implement phone number signup (if needed)
        // Example: const confirmationResult = await sendSignInLinkToEmail(auth, emailOrPhone);
      } else {
        console.error("Invalid email or phone number format");
        return;
      }

      console.log("Signup successful");
      setNewUser(auth.currentUser);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }

    setEmailOrPhone("");
    setPassword("");
  };
  
  const addUser = async (user) => {
    const q = query(
      collection(firestore, "User"),
      where("uid", "==", user.uid)
    );
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
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleTwitterLogin = async () => {
    const provider = new TwitterAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Twitter login successful");
      setNewUser(auth.currentUser);
    } catch (error) {
      console.error("Error signing in with Twitter:", error.message);
    }
  };

  const handleToggleMode = () => {
    setIsSignInMode((prevMode) => !prevMode);
    setEmailOrPhone("");
    setPassword("");
  };


  return (
    <div>
      {user ? (
        <MainPage />
      ) : (
        <div>
          <div className="element" >
            <h2>{isSignInMode ? "Login Page" : "Sign Up Page"}</h2><br></br>
            <input
              type="text"
              placeholder="Email or Phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={isSignInMode ? handleLogin : handleSignup}>
              {isSignInMode ? "Login" : "Sign Up"}
            </button>
            <button onClick={handleToggleMode}>
              Go to {isSignInMode ? "Sign Up Page" : "Login Page"}
            </button>
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