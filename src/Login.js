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
import "./login.css"


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
        <div className="login">
          <img className="login-child" alt="" src="/rectangle-7.svg" />
          <img className="login-item" alt="" src="/ellipse-1.svg" />
          <img className="login-inner" alt="" src="/ellipse-2.svg" />
          <div >
            <h2 className="sign-in">{isSignInMode ? "Login Page" : "Sign Up Page"}</h2><br/>
            <div className="rectangle-parent">
            <div className="group-child" />
            <div className="emailphone-no">Email/phone no.
            <input
              className="login-input"
              type="text"
              placeholder="Email or Phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            </div>
            <div className="rectangle-group">
            <div className="group-item" />
            <div className="password">password
           <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
      </div>
            </div>
           
            <button className="login-btn" onClick={isSignInMode ? handleLogin : handleSignup}>
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

// import "./Login.css";

// const Login = () => {
//   return (
//     <div className="login">
//       <img className="login-child" alt="" src="/rectangle-7.svg" />
//       <img className="login-item" alt="" src="/ellipse-1.svg" />
//       <img className="login-inner" alt="" src="/ellipse-2.svg" />
//       <b className="sign-in">Sign in</b>
//       <div className="rectangle-div" />
//       <div className="login-child1" />
//       <div className="rectangle-parent">
//         <div className="group-child" />
//         <div className="emailphone-no">Email/phone no.</div>
//       </div>
//       <div className="rectangle-group">
//         <div className="group-item" />
//         <div className="password">password</div>
//       </div>
//       <img className="image-1-icon" alt="" src="/image-1@2x.png" />
//       <div className="component-3">
//         <div className="component-3-child" />
//         <div className="sign-in1">sign in</div>
//       </div>
//       <img className="group-icon" alt="" src="/group-48.svg" />
//       <div className="or">OR</div>
//       <img className="group-icon1" alt="" src="/group.svg" />
//       <div className="login-child2" />
//       <div className="already-have-account">{`Already have  account ? Log in `}</div>
//     </div>
//   );
// };

// export default Login;
