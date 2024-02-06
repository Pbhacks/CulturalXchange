import * as React from "react";
import styled from "styled-components";
import IndivChatList from "./IndivChatList";
import Profile from "./Profile";
import MetaInfo from "./MetaInfo";
import useGetChatList from "../../hooks/useGetChatList";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import { User } from "../../types/type";
import { redirect, useNavigate } from "react-router-dom";
import InputBar from "./InputBar";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/authSlice.js";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";


export default function MyComponent() {
  const { chatList } = useGetChatList();

  const navigate = useNavigate();

  const user = useSelector((state: any) => state.auth.user as User);

  const [contactName, setContactName] = useState<string>("TestName");
  const [currentRoomId, setRoomId] = useState<string>("");

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
    if (!user) {
      redirect("/login");
    }
  }, [user]);

  return (
    <Div>
      <Div2>
        <Column>
          <Div3>
            <Div4>
              <Profile />
            </Div4>
            <ChatList>
              {chatList &&
                chatList.map(({ roomId }) => {
                  return (
                    <IndivChatList
                      roomId={roomId}
                      setRoomId={setRoomId}
                      setConnectName={setContactName}
                    />
                  );
                })}
              <Div28>
                <Img21
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/39b75ad870f45ce18e62289f2d1095161a7bff5111bb68c2d6962a3cfe6f4fe9?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&"
                />
                <Div29> Universal Search</Div29>
              </Div28>
            </ChatList>
          </Div3>
        </Column>
        <Column4>
          <Div30>
            <Div31>
              <Div32>
                <Img22
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/039a78b90d4e5caadaf09f1e40d6b3e4f33678b7deb0de4f740b42a2507aecab?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&"
                />
                <Div33>{contactName}</Div33>
                <Img23
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0c0c6102d125a8c07f095e1a86817ebc35b5649f007e880970403d17b6443485?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c0c6102d125a8c07f095e1a86817ebc35b5649f007e880970403d17b6443485?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c0c6102d125a8c07f095e1a86817ebc35b5649f007e880970403d17b6443485?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c0c6102d125a8c07f095e1a86817ebc35b5649f007e880970403d17b6443485?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c0c6102d125a8c07f095e1a86817ebc35b5649f007e880970403d17b6443485?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c0c6102d125a8c07f095e1a86817ebc35b5649f007e880970403d17b6443485?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c0c6102d125a8c07f095e1a86817ebc35b5649f007e880970403d17b6443485?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c0c6102d125a8c07f095e1a86817ebc35b5649f007e880970403d17b6443485?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&"
                />
              </Div32>
              <Img24
                onClick={handleSignOut}
                alt="back_button"
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/55e8a47e6f08aeb9cf9b7ec95e0d5d5a5e7ae04e96bbb30f697f23b2eaefbd88?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e8a47e6f08aeb9cf9b7ec95e0d5d5a5e7ae04e96bbb30f697f23b2eaefbd88?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e8a47e6f08aeb9cf9b7ec95e0d5d5a5e7ae04e96bbb30f697f23b2eaefbd88?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e8a47e6f08aeb9cf9b7ec95e0d5d5a5e7ae04e96bbb30f697f23b2eaefbd88?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e8a47e6f08aeb9cf9b7ec95e0d5d5a5e7ae04e96bbb30f697f23b2eaefbd88?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e8a47e6f08aeb9cf9b7ec95e0d5d5a5e7ae04e96bbb30f697f23b2eaefbd88?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e8a47e6f08aeb9cf9b7ec95e0d5d5a5e7ae04e96bbb30f697f23b2eaefbd88?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/55e8a47e6f08aeb9cf9b7ec95e0d5d5a5e7ae04e96bbb30f697f23b2eaefbd88?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&"
              />
            </Div31>
            <Div34>
              {/* rendering chat*/}
              {currentRoomId && <Chat roomId={currentRoomId} />}
              <Div35>
                <Img26
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1cfe575107f82fb6ef876825d733ff11f1ffa9c3601027579634595eb9f8938?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&"
                />
                <Img27
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/92f1280ae13e3bcedf6b769306df7dc4cac7e3ef60dd91fc34df3309a32dfba4?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&"
                />
                <Img28
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2009b511e1e7c948d497f6fae1df2f705808127e14da41b04350fd752d9830f?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&"
                />
              </Div35>
            </Div34>
            <Div36>
              <InputBar currentRoomId={currentRoomId} />
              <Img31
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b47e95f7da6f1259c02809174c7da900057b6b3efd5289eba885e6db43abec2b?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b47e95f7da6f1259c02809174c7da900057b6b3efd5289eba885e6db43abec2b?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b47e95f7da6f1259c02809174c7da900057b6b3efd5289eba885e6db43abec2b?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b47e95f7da6f1259c02809174c7da900057b6b3efd5289eba885e6db43abec2b?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b47e95f7da6f1259c02809174c7da900057b6b3efd5289eba885e6db43abec2b?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b47e95f7da6f1259c02809174c7da900057b6b3efd5289eba885e6db43abec2b?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b47e95f7da6f1259c02809174c7da900057b6b3efd5289eba885e6db43abec2b?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b47e95f7da6f1259c02809174c7da900057b6b3efd5289eba885e6db43abec2b?apiKey=6432bfca9c544a2fbbfea017dc3ba42f&"
              />
            </Div36>
          </Div30>
        </Column4>
      </Div2>
    </Div>
  );
}

const Div = styled.div`
  height: 100vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

const Div2 = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 31%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div3 = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div4 = styled.div`
  background-color: rgba(
    255,
    249.61163073778152,
    249.61163073778152,
    0.23999999463558197
  );
  padding: 20px 80px 20px 22px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const ChatList = styled.div`
  background-color: rgba(
    80.00000283122063,
    68.00000354647636,
    56.000000461936,
    0.44999998807907104
  );
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div28 = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 250, 250, 0.24);
  z-index: 10;
  display: flex;
  margin-top: 71px;
  justify-content: space-between;
  gap: 19px;
  padding: 14px 24px 14px 12px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    padding-right: 20px;
    margin-top: 40px;
  }
`;

const Img21 = styled.img`
  aspect-ratio: 0.96;
  object-fit: contain;
  object-position: center;
  width: 24px;
  overflow: hidden;
  max-width: 100%;
  margin: auto 0;
`;

const Div29 = styled.div`
  justify-content: center;
  color: var(--base-colour-2, #fff);
  white-space: nowrap;
  border-radius: 40px;
  background-color: var(--base-colour-1, rgba(84, 107, 232, 0.45));
  flex-grow: 1;
  align-items: start;
  padding: 14px 60px 14px 15px;
  font: 300 14px/143% Segoe UI, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
    max-width: 100%;
    padding-right: 20px;
  }
`;

const Column4 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 69%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
    margin: 0;
  }
`;

const Div30 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div31 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const Div32 = styled.div`
  background-color: var(--base-colour-1, rgba(84, 107, 232, 0.45));
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
  gap: 20px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    padding: 0 20px;
  }
`;

const Img22 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 50px;
  overflow: hidden;
  max-width: 100%;
`;

const Div33 = styled.div`
  justify-content: center;
  color: var(--base-colour-2, #fff);
  text-align: center;
  border-radius: 20px;
  background-color: var(--translucent-color, rgba(80, 68, 56, 0.45));
  align-self: stretch;
  flex-grow: 1;
  align-items: center;
  margin: auto 0;
  padding: 16px 60px;
  font: 700 24px/83% Segoe UI, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const Img23 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 50px;
  overflow: hidden;
  border-radius: 50%;
  max-width: 100%;
`;

const Img24 = styled.img`
  aspect-ratio: 1.04;
  object-fit: contain;
  object-position: center;
  width: 73px;
  overflow: hidden;
  max-width: 100%;
`;

const Div34 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const Div35 = styled.div`
  background-color: var(--translucent-color, rgba(80, 68, 56, 0.45));
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 73px;
  @media (max-width: 991px) {
    display: none;
  }
`;

const Img26 = styled.img`
  aspect-ratio: 1.06;
  object-fit: contain;
  object-position: center;
  width: 53px;
  overflow: hidden;
  margin-top: 248px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Img27 = styled.img`
  aspect-ratio: 1.06;
  object-fit: contain;
  object-position: center;
  width: 53px;
  overflow: hidden;
  margin-top: 79px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Img28 = styled.img`
  aspect-ratio: 1.06;
  object-fit: contain;
  object-position: center;
  width: 53px;
  overflow: hidden;
  margin-top: 79px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Div36 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Img31 = styled.img`
  aspect-ratio: 1.11;
  object-fit: contain;
  object-position: center;
  width: 73px;
  overflow: hidden;
  max-width: 100%;
`;
