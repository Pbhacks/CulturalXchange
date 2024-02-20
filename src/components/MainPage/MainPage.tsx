// src/MainPage.js
import React, { useEffect } from "react";
import styled from "styled-components";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { User } from "../../types/type";
import ChatList from "./ChatList";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/authSlice.js";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "../../MainPage.css"
import img1 from "../../img/mainPage1.png"
import img2 from "../../img/mainPage2.png"
import img3 from "../../img/mainPage3.png"

const MainPage = () => {
  const user = useSelector((state: any) => state.auth.user as User);

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign-out successful");
      dispatch(logout()); // Dispatch the logout action
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(firestore, "User"),
      where("uid", "==", user.uid)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        console.log("Current data: ", doc.data());
      });
    });
    return () => {
      unsub();
    };
  }, [user]);

  return (
    <>
      <section className="mainpage-header">
    <div className="mainpage-nav">
      <div className="mainPage-mainPage-div-block-4">
        <div className="mainPage-text-block">CulturalXchange</div>
      </div>
      <div>
      <button className="mainPage-text-block-2" onClick={() => window.location.href = "Aboutus1"}>About</button>
      </div>
    </div>
    <div className="mainpage-hero">
      <h1 className="mainPage-heading">Forge Global Bonds</h1>
      <p className="mainPage-paragraph">Connect people worldwide for peace and understanding. join us in fostering global friendship
      </p>
      <div className="mainPage-mainPage-div-block-5"><a href="\login" className="hero-btn w-button">Sign In</a><a href="#main-body"
          className="hero-btn w-button">Explore</a></div>
    </div>
  </section>
  <section id="main-body" className="mainpage-body">
    <h1 className="mainPage-heading-2">Connecting Cultures for peace</h1>
    <h2 className="mainPage-heading-3">forge global connections for peace on our plarform where millions connect and enage</h2>
    <div className="mainPage-div-block">
      <div className="mainPage-div-block-3"><img
          src={img1}
          alt="" /></div>
      <div className="mainPage-div-block-2">
        <h2 className="mainPage-heading-4">1. Join the community</h2>
        <p>Sign up and become part of our global community dedicated to fostering connections, promoting peace, and
          ensuring everyone has the right to speak. Our thorough application review, along with secure phone number
          logins, guarantees a safe and enjoyable experience for all.</p>
      </div>
    </div>
    <div className="mainPage-div-block revf">
      <div className="mainPage-div-block-2">
        <h2 className="mainPage-heading-5">2. Discover Diverse Communities</h2>
        <p>Explore and connect with like-minded individuals from various worldwide communities. Our platform simplifies
          the process of finding the perfect connection—whether based on interests, location, or language.</p>
      </div>
      <div className="mainPage-div-block-3"><img
          src={img2}
          alt="" /></div>
    </div>
    <div className="mainPage-div-block">
      <div className="mainPage-div-block-3"><img
          src={img3}
          alt="" /></div>
      <div className="mainPage-div-block-2">
        <h2 className="mainPage-heading-6">3. Engage in Conversations</h2>
        <p>Choose your preferred mode of communication—text, voice notes, audio, or video calls. Keep the conversation
          flowing with in-app tools designed for seamless interaction. Embrace a platform where connections transcend
          borders for a more harmonious world.</p>
      </div>
    </div>
  </section>
    </>
  );
};

export default MainPage;
