import { Cancel, Autorenew } from "@mui/icons-material";
import axios from "axios";
import { useRef, useState } from "react";
import "./Register.css";

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/auth/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
      <div className="logo">
        <Autorenew className="logoIcon" />
        <span className="logoIcon">FleaGo</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          id="inputID"
          placeholder="Username"
          ref={usernameRef}
        />
        <input
          type="email"
          id="inputID"
          placeholder="Email address"
          ref={emailRef}
        />
        <input
          type="password"
          min="6"
          id="inputID"
          placeholder="Password"
          ref={passwordRef}
        />
        <button className="registerBtn" type="submit">
          Register
        </button>
        {success && (
          <span className="success">Successfull! You may login now!</span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}
