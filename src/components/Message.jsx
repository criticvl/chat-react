import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });

    return () => {};
  }, [message]);

  return message.text === "" && message.img === undefined ? (
    ""
  ) : (
    <>
      <div
        ref={ref}
        className={`message ${
          message.senderID === currentUser.uid && "client"
        }`}
      >
        <div className="messageInfo">
          <img
            src={
              message.senderID === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt="Avatar"
          />
          <span></span>
        </div>
        <div className="messageWrapper">
          <div className="messageContent">
            {message.text === "" ? "" : <p>{message.text}</p>}
            {message.img && <img src={message.img} alt="chatImage" />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
