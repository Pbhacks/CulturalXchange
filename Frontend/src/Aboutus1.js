import React from 'react';
import { Link } from 'react-router-dom';
import './Aboutus1.css'; // Import the CSS file

function AboutUs() {
  return (
    <div id="aboutus">
      <h1>CulturalXchange</h1>
      <h2>"ABOUT US"</h2>
      <p>
        The Aim Of Our App Is To Spread Peace Amongst All Communities Around The
        World. The Peace Making App Is Gonna Break Boundaries Using Hybrid
        Structure Using Gemimi Ai.
      </p>
      <p>
        So The Cultural Exchange App Dives Deeper Into Cultural Connect And
        Language Exchange It Has A Very Segmented Communities Section Which
        Includes Augmented Communications. You Would Be Able To Connect With All
        The People Around The World And Share Your Cultural And Language
        Experience.
      </p>
      <Link to="/Aboutus2" className="button">Know More</Link>
    </div>
  );
}

export default AboutUs;
