import * as React from "react";
import styled from "styled-components";
import Profile from "./Profile";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import { User } from "../../types/type";
import { redirect, useNavigate } from "react-router-dom";
import InputBar from "./InputBar";
import "./PublishedComponentStyle.css"

import UserList from "./UserList";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/authSlice.js";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";



export default function MyComponent() {
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
    <div
    id="w-node-_8f3bce48-c76a-b674-e0a0-df16721a330a-6dcbac69"
    className="w-layout-layout quick-stack wf-layout-layout"
  >
{/*     <div
      id="w-node-c00677da-7626-4016-a865-67375010e02b-6dcbac69"
      className="w-layout-cell cell-2"
    >
      <div className="w-layout-blockcontainer container-4 w-container"></div>
    </div> */}
    <div
      id="w-node-_86d87ce1-b7ac-0206-67c6-e8eca97c4219-6dcbac69"
      className="w-layout-cell messcell"
    >
      <div className="w-layout-blockcontainer container-2 w-container">
        <div className="mess">
          <h3 className="heading-3">
             Chats
            <br />‍
          </h3>
        </div>
        <section className="chats">
          <div className="search">
            <div className="text-block-2">Search Direct Messages... .</div>
            <img
              src="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65cb5e24810fbcff76141435_TB-8-5a3acc9425da0.png"
              loading="lazy"
              width={45}
              height={45}
              alt=""
              className="image-8"
            />
            <div className="div-block-7" />
          </div>
        </section>
        <div className="div-block-3">
          <div className="div-block-4">
            <img
              src="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac.png"
              loading="lazy"
              sizes="(max-width: 479px) 28.203125px, 11vw"
              srcSet="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac-p-500.png 500w, https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac-p-800.png 800w, https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac.png 1024w"
              alt=""
              className="image-5"
            />
          </div>
          <h4
            id="w-node-c806109b-981c-5b79-dd31-63b631075a98-6dcbac69"
            className="heading-2"
          >
            Someone
          </h4>
          <div
            id="w-node-_9e743699-f0e7-2754-2b9d-3f552a242656-6dcbac69"
            className="text-block-3"
          >
            Lorem ...{" "}
          </div>
          <div className="text-block-4">12:30</div>
        </div>
        <div className="div-block-3">
          <div className="div-block-4">
            <img
              src="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac.png"
              loading="lazy"
              sizes="(max-width: 479px) 28.203125px, 11vw"
              srcSet="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac-p-500.png 500w, https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac-p-800.png 800w, https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac.png 1024w"
              alt=""
              className="image-5"
            />
          </div>
          <h4
            id="w-node-_1e98d393-3bfc-aae7-cf14-653ab99d5815-6dcbac69"
            className="heading-2"
          >
            Someone
          </h4>
          <div
            id="w-node-_1e98d393-3bfc-aae7-cf14-653ab99d5817-6dcbac69"
            className="text-block-3"
          >
            Lorem ...{" "}
          </div>
          <div className="text-block-4">12:30</div>
        </div>
        <div className="div-block-3">
          <div className="div-block-4">
            <img
              src="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac.png"
              loading="lazy"
              sizes="(max-width: 479px) 28.203125px, 11vw"
              srcSet="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac-p-500.png 500w, https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac-p-800.png 800w, https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac.png 1024w"
              alt=""
              className="image-5"
            />
          </div>
          <h4
            id="w-node-_2feba637-45c1-c722-62be-21098e659240-6dcbac69"
            className="heading-2"
          >
            Someone
          </h4>
          <div
            id="w-node-_2feba637-45c1-c722-62be-21098e659242-6dcbac69"
            className="text-block-3"
          >
            Lorem ...{" "}
          </div>
          <div className="text-block-4">12:30</div>
        </div>
        <div className="div-block-3">
          <div className="div-block-4">
            <img
              src="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac.png"
              loading="lazy"
              sizes="(max-width: 479px) 28.203125px, 11vw"
              srcSet="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac-p-500.png 500w, https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac-p-800.png 800w, https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac.png 1024w"
              alt=""
              className="image-5"
            />
          </div>
          <h4
            id="w-node-b3bd06f1-119e-37b9-ddea-23d2205d168f-6dcbac69"
            className="heading-2"
          >
            Someone
          </h4>
          <div
            id="w-node-b3bd06f1-119e-37b9-ddea-23d2205d1691-6dcbac69"
            className="text-block-3"
          >
            Lorem ...{" "}
          </div>
          <div className="text-block-4">12:30</div>
        </div>
        <div className="div-block-o">
          <div
            id="w-node-_0f6c8e83-d115-508c-7d86-a8c87d97caa2-6dcbac69"
            className="div-block-9"
          >
            <svg
              width={34}
              height={34}
              viewBox="0 0 40 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 16.75H39"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 32.5V1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div
      id="w-node-_31a387a4-af5f-ee69-3c53-7dfc989377e1-6dcbac69"
      className="w-layout-cell cell"
    >
      <div className="w-layout-blockcontainer container-3 w-container">
        <div className="dm">
          <div
            id="w-node-e9ce4152-df27-6c73-7f08-c6cab6db622c-6dcbac69"
            className="div-block-9"
          >
            <img
              src="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65cb7b89d912eb7e27f5af8b_icon_3.png"
              loading="lazy"
              width={10}
              id="w-node-_6171a84a-fa55-5186-d243-196b0e084e40-6dcbac69"
              alt=""
              className="image-9"
            />
          </div>
          <div
            id="w-node-dde423f0-5e09-e76e-d76c-3c15e1d5ca61-6dcbac69"
            className="text-block"
          >
            Start a new message...
          </div>
          <div
            id="w-node-_92256b0e-d6c4-1d78-8282-15a244d850c8-6dcbac69"
            className="div-block-8"
          >
            <div
              id="w-node-_9dcc8c23-c1bd-6622-b4d2-a38c536824af-6dcbac69"
              className="div-block-10"
            >
              <a
                id="w-node-_9725e863-86f3-9ac7-f305-406d05be9de6-6dcbac69"
                href="#"
                className="button w-button"
              >
                send
              </a>
            </div>
          </div>
        </div>
        <div className="usern">
          <h3
            id="w-node-_3b554db8-caea-8895-823b-a4e0677fc28c-6dcbac69"
            className="heading-4"
          >
            SomeOne
          </h3>
          <div className="div-block-5">
            <img
              src="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac.png"
              loading="lazy"
              sizes="50px"
              srcSet="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac-p-500.png 500w, https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac-p-800.png 800w, https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca67d9e9646b89b321f4e2_c24aaf49f7dc286dd0f7020a5bb820ac.png 1024w"
              alt=""
              className="image-6"
            />
          </div>
          <div
            id="w-node-_2ec8c127-8e29-e62f-1f43-2c2ebe569e00-6dcbac69"
            className="div-block-6"
          >
            <img
              src="https://assets-global.website-files.com/65c32f325ae02f516dcbac61/65ca6f3c74443093f327297f_R.png"
              loading="lazy"
              alt=""
              className="image-7"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

 /*  return (
    <Div>
      <Div2>
        <Column>
          <Div3>
            <Div4>
              <Profile />
            </Div4>
            <UserList
              contactName={contactName}
              setRoomId={setRoomId}
              setContactName={setContactName}
            />
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
              /*rendering chat*/
             /*  {currentRoomId && <Chat roomId={currentRoomId} />}
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
} */

/* const Div = styled.div`
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
 */