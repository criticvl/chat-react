import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Chat from "../components/Chat.jsx";

export default function Home() {
  return (
    <>
      <div className="homeWrapper">
        <Sidebar />
        <Chat />
      </div>
    </>
  );
}
