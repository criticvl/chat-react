import React from "react";
import Navbar from "./Navbar.jsx";
import Search from "./Search.jsx";
import ChatList from "./ChatList.jsx";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <ChatList />
    </div>
  );
}
