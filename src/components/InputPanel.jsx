import React, { useContext, useState } from "react";
import imageIcon from "../assets/image-icon.png";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function InputPanel() {
  const [text, setText] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSendText = async () => {
    await updateDoc(doc(db, "chats", data.chatID), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderID: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });

    setText("");
  };

  const handleSendImage = async (img) => {
    if (img) {
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "chats", data.chatID), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderID: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          } catch (err) {
            // setErr(true);
          }
        });
      });
    }
  };

  const handleKeyDown = (e) => {
    text !== "" && e.keyCode === 13 && handleSendText();
  };

  let inputDisabled = true;
  data.user?.displayName ? (inputDisabled = false) : (inputDisabled = true);

  return (
    <div className="inputPanel">
      <input
        id="chatInput"
        type="text"
        disabled={inputDisabled}
        placeholder="Write a message..."
        value={text}
        onKeyDown={handleKeyDown}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="file"
        disabled={inputDisabled}
        id="messageFile"
        onChange={(e) => {
          handleSendImage(e.target.files[0]);
        }}
      />
      <label htmlFor="messageFile">
        <img src={imageIcon} alt="imgIcon" />
      </label>
      <button
        disabled={inputDisabled}
        onClick={text !== "" ? handleSendText : undefined}
      >
        Send
      </button>
    </div>
  );
}

export default InputPanel;
