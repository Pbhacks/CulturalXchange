import React from 'react'
import MyComponent from '../ui/PublishedComponent'
import "./mainFramStyle.css"

function MainFram() {
  return (
    <section className="mainsection">
        <div className="mainframe-divblock2">
            <div className="mainfram-divblock3"><img
                    src="https://assets-global.website-files.com/65bdd5d09760d72632451374/65c362e41783a6bf53200d31_WhatsApp%20Image%202024-02-07%20at%2016.21.09.jpeg"
                    loading="lazy" width="108" height="108" alt=""
                    sizes="(max-width: 479px) 30vw, 108px" /></div>
            <div className="mainfram-divblock2">
                <div className="mainframdivblock3">
                <i style={{color:"gray"}}  className="bi bi-chat-left-dots-fill"></i>
                    <a href="#"
                        className="link-block w-inline-block">
                        <div className="text-block">Chats</div>
                    </a></div>
                <div className="mainframdivblock3"><i style={{color:"gray"}} className="bi bi-person-fill"></i><a href="#"
                        className="link-block w-inline-block">
                        <div className="text-block">Status</div>
                    </a></div>
                <div className="mainframdivblock3"><i style={{color:"gray"}} className="bi bi-person-hearts"></i><a href="#"
                        className="link-block w-inline-block">
                        <div className="text-block">Community</div>
                    </a></div>
                <div className="mainframdivblock3"><i style={{color:"gray"}} className="bi bi-alexa"></i><a href="#"
                        className="link-block w-inline-block">
                        <div className="text-block">MyAI</div>
                    </a></div>
                <div className="mainframdivblock3"><i style={{color:"gray"}} className="bi bi-question-circle-fill"></i><a href="#"
                        className="link-block w-inline-block">
                        <div className="text-block">Help</div>
                    </a></div>
                <div className="mainframdivblock3 btm"><i style={{color:"gray"}} className="bi bi-gear-fill"></i><a href="#"
                        className="link-block w-inline-block">
                        <div className="text-block">Setting</div>
                    </a></div>
            </div>
        </div>
        <div className="mainfram-divblock">
            <MyComponent/>
        </div>
    </section>
  )
}

export default MainFram;
