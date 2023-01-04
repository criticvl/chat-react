import { auth } from "../firebase.js";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
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
      <span>Login</span>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button>Log In</button>
        {err ? <span className="error">Something went wrong!</span> : ""}
      </form>
      <p>
        Don't have an Account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
