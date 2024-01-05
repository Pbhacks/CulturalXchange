// src/MainPage.js
import React from 'react';
import styled from 'styled-components';

const MainPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.section`
  margin-top: 20px;
`;

const MainPage = () => {
  return (
    <MainPageContainer>
      <h1>Main Page</h1>
      <Section>
        <h2>Contacts</h2>
        {/* Add contacts list or component here */}
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
