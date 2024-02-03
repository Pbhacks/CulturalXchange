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
        <div className="section">
          
          <div className="div-block-2">
          <div class="div-block"><img
                    src="https://assets-global.website-files.com/65bdd5d09760d72632451374/65bddba716b61d97d01e3f29_image%201.png"
                    loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 45vw, 46vw"
                    srcset="https://assets-global.website-files.com/65bdd5d09760d72632451374/65bddba716b61d97d01e3f29_image%201-p-500.png 500w, https://assets-global.website-files.com/65bdd5d09760d72632451374/65bddba716b61d97d01e3f29_image%201-p-800.png 800w, https://assets-global.website-files.com/65bdd5d09760d72632451374/65bddba716b61d97d01e3f29_image%201.png 949w"
                    alt="" /></div>
          <div className="div-block-3">
          <div className="w-layout-blockcontainer container w-container">
            <h2 className="heading">{isSignInMode ? "Login Page" : "Sign Up Page"}</h2><br/>
            <div className="w-form">
            <div className="form">
            <input
            className="text-field w-input"
              type="text"
              placeholder="Email or Phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
           <input
             className="text-field-2 w-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="submit-button w-button" onClick={isSignInMode ? handleLogin : handleSignup}>
              {isSignInMode ? "Login" : "Sign Up"}
            </button>
            <p onClick={handleToggleMode} ><a href="#">{isSignInMode ? "Don't have account? Sign Up" : "Have an account? Login"}</a></p>
            <p className="paragraph">OR</p>
                            <div className="div-block-4">
                                <div onClick={handleGoogleLogin}><img
                                        src="https://assets-global.website-files.com/65bdd5d09760d72632451374/65bdfb7e9b85333f539464b8_Group.svg"
                                        loading="lazy" alt="" class="login-img" /></div>
                                <div onClick={handleTwitterLogin}><img
                                        src="https://assets-global.website-files.com/65bdd5d09760d72632451374/65bdfb7e7a30057ce99e0055_Group%2048.svg"
                                        loading="lazy" alt="" class="login-img" /></div>
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

