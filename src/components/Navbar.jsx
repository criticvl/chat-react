import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import UserPNG from "../assets/user.png";

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span>
        Chat made by
        <a href="https://github.com/criticvl" target="_blank" rel="noreferrer">
          @criticvl
        </a>
      </span>
      <div className="user">
        <img src={currentUser.photoURL || UserPNG} alt="" />
        <span>{currentUser.displayName || "User"}</span>
        <button
          onClick={() => {
            signOut(auth);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
