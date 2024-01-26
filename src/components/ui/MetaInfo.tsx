import React from "react";
import styled from "styled-components";

const MetaInfo = () => {
  return (
    <MetaInfoWrapper>
      <Div10>
        <Div11>DATE: 2024-01-01</Div11>
        <Div12>TIME: 09 : 00 AM</Div12>
      </Div10>
      <Div13>
        <Div14>25℃</Div14>
        <Img2
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/56fe52575656322ef9bb47d85a93ae75ddc6b2b3fbc1b68bd1a1c47a85a4449c?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&"
        />
      </Div13>
    </MetaInfoWrapper>
  );
};

export default MetaInfo;

const MetaInfoWrapper = styled.div`
  background-color: var(--base-colour-1, rgba(84, 107, 232, 0.45));
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  width: calc(100% - 50px);
  padding: 17px 25px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    padding: 0 20px;
  }
`;

const Img2 = styled.img`
  aspect-ratio: 1.25;
  object-fit: contain;
  object-position: center;
  width: 35px;
  overflow: hidden;
  max-width: 100%;
`;

const Div10 = styled.div`
  align-self: start;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: var(--base-colour-2, #fff);
  font-weight: 600;
  white-space: nowrap;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div11 = styled.div`
  font-family: Inter, sans-serif;
`;

const Div12 = styled.div`
  font-family: Inter, sans-serif;
  margin-top: 14px;
`;

const Div13 = styled.div`
  align-self: end;
  display: flex;
  margin-top: 37px;
  justify-content: space-between;
  gap: 20px;
`;

const Div14 = styled.div`
  justify-content: center;
  color: var(--base-colour-2, #fff);
  text-align: center;
  margin: auto 0;
  font: 600 16px Inter, sans-serif;
`;
