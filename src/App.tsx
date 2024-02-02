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
import "./App.css";
import Room from "./components/MainPage/Room";
import ChatList from "./components/MainPage/ChatList";
import MyComponent from "./components/ui/PublishedComponent";

const Navigation = () => {
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
  const { pathname } = useLocation();

  return (
    <Router>
      {/* Can render it when you want to render in page */}
      {pathname !== "/testing" && <Navigation />}
      <Routes>
        <Route path="/testing" element={<MyComponent />} />
        <Route
          path="/"
          element={
            <div className="container home">
              <Home />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="container login">
              <Login />
            </div>
          }
        />
        <Route
          path="/chat/:chatListId"
          element={
            <div className="container chatList">
              <ChatList />
            </div>
          }
        >
          <Route
            path=":roomId"
            element={
              <div className="container room">
                <Room />
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
