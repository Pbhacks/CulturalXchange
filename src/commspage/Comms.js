import React from 'react';
import './global.css';
import './index.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const CommunitiesPage = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  const handleNavigation = (route) => {
    navigate(route); // Use navigate instead of history.push
  };

  return (
    <div className="communties-page">
      <header className="community-frame-group">
        <div className="f-r-a-m-e">
          <div className="culturalxchange">
            <div className="culturalxchange1">CulturalXchange</div>
          </div>
          <div className="f-r-a-m-e1">
            <div className="home">
              <button onClick={() => handleNavigation('/MainPage')} className="button">
                Home
              </button>
              <button onClick={() => handleNavigation('/Aboutus1')} className="button">
                About
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="f-r-a-m-e3">
        <section className="f-r-a-m-e-group">
          <div className="f-r-a-m-e-group1">
            <div className="frame-parent">
              <img className="frame-child" loading="eager" alt="" src="imgs/southk.png" />

              <div className="south-korea">
                <div className="south-korea1">South Korea</div>
              </div>
            </div>
            <div className="frame-group">
              <img className="frame-item" loading="eager" alt="" src="imgs\china.png" />

              <div className="china-parent">
                <div className="china">
                  <div className="china1">China</div>
                </div>
                <div className="frame-inner"></div>
              </div>
            </div>
          </div>
          <button className="f-r-a-m-e4">
            <div className="frame-group-east-asia">
              <div className="circle-with-info"></div>
              <img className="frame-group-east-asia-child" alt="" src="imgs\group-67.svg" />
            </div>
          </button>
          <div className="f-r-a-m-e5">
            <div className="country-instance">
              <img className="country-instance-child" loading="eager" alt="" src="imgs\japan.png" />

              <div className="japan">
                <div className="japan1">Japan</div>
              </div>
            </div>
            <div className="india-instance">
              <div className="frame-container">
                <img className="group-icon" loading="eager" alt="" src="imgs\india.png" />

                <div className="india">
                  <div className="india1">India</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CommunitiesPage;
