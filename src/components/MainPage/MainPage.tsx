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
import img4 from "../../img/mainPage4.jpeg"
import img5 from "../../img/mainPage5.jpeg"

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
        <div className="mainPage-text-block-2">About</div>
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
    <div className="mainPage-div-block revf">
      <div className="mainPage-div-block-2">
        <h2 className="mainPage-heading-5">4. Cultural inspiration</h2>
        <p>Imagine a world where borders dissolve, and cultures converge effortlessly through the tap of a screen. With our messenger app designed for cultural exchange, this vision becomes a vibrant reality. Users from every corner of the globe, from the bustling streets of Mumbai to the serene temples of Kyoto, can seamlessly connect, share experiences, and foster mutual understanding. Through real-time text, voice, and video communication, individuals can immerse themselves in the rich tapestry of global diversity without leaving their homes. Whether it's learning about traditional Chinese calligraphy or discussing the latest Bollywood masterpiece, our platform serves as a gateway to boundless cultural exploration.</p>
      </div>
      <div className="mainPage-div-block-3"><img
          src={img4}
          alt="" /></div>
    </div>
    <div className="mainPage-div-block">
      <div className="mainPage-div-block-3"><img
          src={img5}
          alt="" /></div>
      <div className="mainPage-div-block-2">
        <h2 className="mainPage-heading-6">5. Heritage</h2>
        <p>The benefits of our messenger app extend far beyond mere conversation. By facilitating cross-cultural dialogue, we cultivate empathy, break down stereotypes, and promote global harmony. Users gain invaluable insights into different customs, traditions, and perspectives, fostering a deeper appreciation for the world's cultural mosaic. Businesses leverage this diversity to forge international partnerships, tapping into new markets and unlocking limitless opportunities for growth. Furthermore, our platform serves as a catalyst for social change, empowering individuals to collaborate on global issues such as climate change, human rights, and social justice. Through shared experiences and meaningful connections, our messenger app becomes more than just a tool—it becomes a force for positive change in an interconnected world.</p>
      </div>
    </div>
  </section>
    </>
  );
};

export default MainPage;
