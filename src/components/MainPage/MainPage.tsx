// src/MainPage.js
import React, { useEffect } from "react";
import styled from "styled-components";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useSelector } from "react-redux";
import { User } from "../../types/type";
import ChatList from "./ChatList";
import UserList from "./UserList";

const MainPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.section`
  margin-top: 20px;
`;

const MainPage = () => {
  const user = useSelector((state: any) => state.auth.user as User);

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
    <MainPageContainer>
      <h1>Main Page</h1>
      <Section>
        <h2>Contacts</h2>
        {/* Add contacts list or component here */}
      </Section>

      <Section>
        <h2>Your current ChatList</h2>
      </Section>

      <Section>
        <h2>Messages</h2>
        {/* Add messages list or component here */}
      </Section>
      <Section>
        <h2>Communities</h2>
        {/* Add communities list or component here */}
      </Section>
    </MainPageContainer>
  );
};

export default MainPage;
