import React from "react";
import MyComponent from "../ui/PublishedComponent";
import "./mainFramStyle.css";
import { Link } from 'react-router-dom';

function MainFram() {
  return (
    <section className="mainsection">
      <div className="mainframe-divblock2">
        <div className="mainfram-divblock3">
          <img
            src="https://assets-global.website-files.com/65bdd5d09760d72632451374/65c362e41783a6bf53200d31_WhatsApp%20Image%202024-02-07%20at%2016.21.09.jpeg"
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
            <Link to="#" className="link-block w-inline-block">
              <div className="text-block">Chats</div>
            </Link>
          </div>
          <div className="mainframdivblock3">
            <i style={{ color: "gray" }} className="bi bi-person-fill"></i>
            <Link to="#" className="link-block w-inline-block">
              <div className="text-block">Status</div>
            </Link>
          </div>
          <div className="mainframdivblock3">
            <i style={{ color: "gray" }} className="bi bi-person-hearts"></i>
            {/* Integrate Communities Page here */}
            <Link to="/commspage/Comms" className="link-block w-inline-block">
              <div className="text-block">Community</div>
            </Link>
          </div>
          <div className="mainframdivblock3">
            <i
              style={{ color: "gray" }}
              className="bi bi-question-circle-fill"
            ></i>
            <Link to="#" className="link-block w-inline-block">
              <div className="text-block">Help</div>
            </Link>
          </div>
          <div className="mainframdivblock3 btm">
            <i style={{ color: "gray" }} className="bi bi-gear-fill"></i>
            <Link to="#" className="link-block w-inline-block">
              <div className="text-block">Setting</div>
            </Link>
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
