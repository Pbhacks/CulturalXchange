import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { User } from "../../types/type";
import { redirect } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state: any) => state.auth.user as User);

  if (!user) {
    redirect("/");

    return <div>waiting...</div>;
  }

  return (
    <ProfileWrapper>
      <Column2>
        <Img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ea7b5d95087fc53733e58dd80171bcf3406aaff476eab09cb57da3f7ef2da405?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea7b5d95087fc53733e58dd80171bcf3406aaff476eab09cb57da3f7ef2da405?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea7b5d95087fc53733e58dd80171bcf3406aaff476eab09cb57da3f7ef2da405?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea7b5d95087fc53733e58dd80171bcf3406aaff476eab09cb57da3f7ef2da405?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea7b5d95087fc53733e58dd80171bcf3406aaff476eab09cb57da3f7ef2da405?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea7b5d95087fc53733e58dd80171bcf3406aaff476eab09cb57da3f7ef2da405?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea7b5d95087fc53733e58dd80171bcf3406aaff476eab09cb57da3f7ef2da405?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea7b5d95087fc53733e58dd80171bcf3406aaff476eab09cb57da3f7ef2da405?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&"
        />
      </Column2>
      <Column3>
        <Div6>
          <Div7>{user.name}</Div7>
          <Div8>{user.email}</Div8>
        </Div6>
      </Column3>
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  gap: 20px;
  height: 100px;
  display: flex;
  @media (max-width: 991px) {
    gap: 0px;
  }
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 46%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 100px;
  overflow: hidden;
  border-radius: 50%;
  max-width: 100%;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Column3 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 54%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div6 = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  color: var(--base-colour-2, #fff);
  white-space: nowrap;
  margin: auto 0;
  @media (max-width: 991px) {
    margin-top: 40px;
    white-space: initial;
  }
`;

const Div7 = styled.div`
  font: 700 21px Inter, sans-serif;
  color: black;
`;

const Div8 = styled.div`
  margin-top: 14px;
  font: 100 16px Inter, sans-serif;
  color: black;
`;
