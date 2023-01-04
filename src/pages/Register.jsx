import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase.js";
import React, { useState } from "react";
import Avatar from "../assets/avatar.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [regAvatar, setRegAvatar] = useState(Avatar);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const picture = e.target[3].files[0];

    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, picture).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(resp.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", resp.user.uid), {
              uid: resp.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", resp.user.uid), {});

            navigate("/");
          } catch (err) {
            setErr(true);
          }
        });
      });
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formWrapper">
      <span>
        Chat made by{" "}
        <a target="_blank" rel="noreferrer" href="https://github.com/criticvl">
          @criticvl
        </a>
      </span>
      <span>Register</span>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Your Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <input
          name="picture"
          type="file"
          id="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setRegAvatar(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
        <label htmlFor="file">
          <img src={regAvatar} alt="avatar" />
          Choose your Avatar
        </label>
        <button>Sign Up</button>
        {err ? <span className="error">Something went wrong!</span> : ""}
      </form>
      <p>
        Already have an Account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default Register;
