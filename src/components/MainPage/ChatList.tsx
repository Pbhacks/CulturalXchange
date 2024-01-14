import React from "react";
import { Outlet } from "react-router-dom";

const ChatList = () => {
  return (
    <div>
      chatlist
      <Outlet />
    </div>
  );
};

export default ChatList;
