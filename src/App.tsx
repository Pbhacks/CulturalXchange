// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./Home"; // Update this line
import Login from "./Login"; // Update this line

import Room from "./components/MainPage/Room";
import ChatList from "./components/MainPage/ChatList";
import MyComponent from "./components/ui/PublishedComponent";
import MainPage from "./components/MainPage/MainPage";

const Navigation = () => {
  const { pathname } = useLocation();
  if (pathname === "/testing") {
    return <></>;
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/testing">Chat</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      {/* Can render it when you want to render in page */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="container home">
              <Home />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/login"
          element={
            <div className="container home">
              <Login />
            </div>
          }
        />
        <Route
          path="/MainPage"
          element={
            <div >
              <MainPage />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
