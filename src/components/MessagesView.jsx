import React, { useContext, useEffect, useState } from "react";
import Message from "./Message.jsx";
import { ChatContext } from "../context/ChatContext.js";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";

function MessagesView() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatID]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}

export default MessagesView;
