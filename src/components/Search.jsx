import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { AuthContext } from "../context/AuthContext";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKeyDown = (e) => {
    e.keyCode === 13 && handleSearch();
  };

  const handleSelect = async () => {
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const resp = await getDoc(doc(db, "chats", combinedID));

      if (!resp.exists()) {
        await setDoc(doc(db, "chats", combinedID), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="searchForm"
      >
        <input
          id="searchInput"
          type="text"
          placeholder="Find a User"
          value={username}
          onKeyDown={handleKeyDown}
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>
      {err && <span>User not Found!</span>}
      {user && currentUser.uid !== user.uid && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="avatar" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
          <b>Add Friend</b>
        </div>
      )}
    </div>
  );
}

export default Search;
