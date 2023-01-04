import React, { useContext } from "react";
import InputPanel from "./InputPanel.jsx";
import MessagesView from "./MessagesView.jsx";
import { ChatContext } from "../context/ChatContext.js";

export default function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        {data.user?.displayName ? <span>{data.user?.displayName}</span> : ""}
      </div>
      <MessagesView />
      <InputPanel />
    </div>
  );
}
