import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, firestore } from './firebase';
import MainPage from './components/MainPage/MainPage';
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
import { RecaptchaVerifier, signInWithPopup } from 'firebase/auth';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default country code for India
  const [isSignInMode, setIsSignInMode] = useState(true);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const dispatch = useDispatch();
  const setNewUser = (user) => dispatch(setUser(user));
  const user = useSelector((state) => state.auth.user);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const isEmail = /\S+@\S+\.\S+/.test(email);
      const isPhone = /^\d{10}$/.test(phone);

      if (isEmail) {
        const { user } = await signInWithEmailAndPassword(auth, email, password);

        if (!user.emailVerified) {
          console.log("Email not verified. Please verify your email.");
          return;
        }

        console.log("Login successful");
        setNewUser(user);
      } else if (isPhone) {
        const phoneNumber = `+${countryCode}${phone}`;
  
        // Send OTP verification code
        signInWithPhoneNumber(auth, phoneNumber, new RecaptchaVerifier("recaptcha-container"))
          .then((result) => {
            setConfirmationResult(result); // Store confirmationResult for later verification
            setOtpSent(true);
            // Prompt user for OTP
          })
          .catch((error) => {
            // Handle errors
          });
      } else {
        console.error("Invalid email or phone number format");
        return;
      }

      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const isEmail = /\S+@\S+\.\S+/.test(email);
      const isPhone = /^\d{10}$/.test(phone);

      let user;

      if (isEmail) {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Access user from userCredential
        user = userCredential.user;

        // Send verification email
        await sendEmailVerification(user);

        console.log("Email verification sent to:", user.email);
        setShowVerificationMessage(true);
      } else if (isPhone) {
        const phoneNumber = `+${countryCode}${phone}`;
  
        // Send OTP verification code
        signInWithPhoneNumber(auth, phoneNumber, new RecaptchaVerifier("recaptcha-container"))
          .then((result) => {
            setConfirmationResult(result); // Store confirmationResult for later verification
            setOtpSent(true);
            // Prompt user for OTP
          })
          .catch((error) => {
            // Handle errors
          });
      } else {
        console.error("Invalid email or phone number format");
        return;
      }

      console.log("Signup successful");
      setNewUser(user);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }

    setEmail("");
    setPhone("");
    setPassword("");
  };

  const verifyOtp = async () => {
    try {
      const userCredential = await confirmationResult.confirm(otpCode);
      // Proceed with login or signup after successful OTP verification
      console.log("Phone number verification successful:", userCredential.user);
      // Handle the signed-in user
      // Add user to Firestore or any other necessary actions
    } catch (error) {
      // Handle OTP verification errors
      console.error("Error verifying OTP:", error.message);
    }
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
    setEmail("");
    setPhone("");
    setPassword("");
  };

  return (
    <div>
      {user && user.emailVerified ? (
        <MainPage />
      ) : (
        <div className="section">
          <div className="div-block-2">
            <div className="div-block">
              {/* Your existing code for the image */}
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
                        placeholder="Email or Phone"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    ) : (
                      <>
                        <PhoneInput
                          country={"in"}
                          value={phone}
                          onChange={(number) => setPhone(number)}
                        />
                        <input
                          className="text-field-2 w-input"
                          type="email"  // Change type to email
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </>
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
                      <>
                        <button
                          className="submit-button w-button"
                          onClick={otpSent ? verifyOtp : handleSignup}
                        >
                          {otpSent ? "Verify OTP" : "Send OTP"}
                        </button>
                        {otpSent && (
                          <input
                            className="text-field-2 w-input"
                            type="text"
                            placeholder="OTP"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                          /> 
                        )}
                      </>
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
                          class="login-img"
                        />
                      </div>
                      <div onClick={handleTwitterLogin}>
                        <img
                          src="https://assets-global.website-files.com/65bdd5d09760d72632451374/65bdfb7e7a30057ce99e0055_Group%2048.svg"
                          loading="lazy"
                          alt=""
                          class="login-img"
                        />
                      </div>
                    </div>
                    <div id="recaptcha-container"></div>
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
