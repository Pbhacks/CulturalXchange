// MainFram.js
import React from "react";
import MyComponent from "../ui/PublishedComponent";
import "./mainFramStyle.css";
import { Link } from 'react-router-dom';
import logo from './logo.png';

function MainFram() {
  return (
    <section className="mainsection">
      <div className="mainframe-divblock2">
        <div className="mainfram-divblock3">
          <img
            src={logo}
            loading="lazy"
            width="108"
            height="108"
            alt=""
            sizes="(max-width: 479px) 30vw, 108px"
          />
        </div>
        <div className="mainfram-divblock2">
          <div className="mainframdivblock3">
            <i
              style={{ color: "gray" }}
              className="bi bi-chat-left-dots-fill"
            ></i>
            <a href="#" className="link-block w-inline-block">
              <div className="text-block">Chats</div>
            </a>
          </div>
          <div className="mainframdivblock3">
            <i style={{ color: "gray" }} className="bi bi-person-fill"></i>
            <a href="#" className="link-block w-inline-block">
              <div className="text-block">Status</div>
            </a>
          </div>
          <div className="mainframdivblock3">
            <i style={{ color: "gray" }} className="bi bi-person-hearts"></i>
            {/* Integrate Communities Page here */}
            <Link to="/commspage/Comms" className="link-block w-inline-block">
              <div className="text-block">Community</div>
            </Link>
          </div>
          <div className="mainframdivblock3">
            <i style={{color:"gray"}} className="bi bi-alexa"></i>
            <Link to= ""className="link-block w-inline-block">
                        <div className="text-block">MyAI</div>
                    </Link></div>
           
           <div className="mainframdivblock3">
            <i
              style={{ color: "gray" }}
              className="bi bi-question-circle-fill"
            ></i>
            <a href="#" className="link-block w-inline-block">
              <div className="text-block">Help</div>
            </a>
          </div>
          <div className="mainframdivblock3 btm">
            <i style={{ color: "gray" }} className="bi bi-gear-fill"></i>
            <a href="#" className="link-block w-inline-block">
              <div className="text-block">Settings</div>
            </a>
          </div>
        </div>
      </div>
      <div className="mainfram-divblock">
        <MyComponent />
      </div>
    </section>
  );
}

export default MainFram;
