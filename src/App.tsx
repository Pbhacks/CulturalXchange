import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import MainPage from "./components/MainPage/MainPage";
import Aboutus1 from './Aboutus1';
import Aboutus2 from "./Aboutus2";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/Aboutus1" element={<Aboutus1 />} />
        <Route path="/Aboutus2" element={<Aboutus2 />} />
      </Routes>
    </Router>
  );
};

export default App;
