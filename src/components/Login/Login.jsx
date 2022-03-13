import { useState, useContext } from "react";
import { Cancel, Autorenew } from "@mui/icons-material";

import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";

import "./Login.css";

export default function Login({ setShowLogin }) {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
    if (user) return setShowLogin(false);
    else if (!user) return setError(true);
    else return;
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Autorenew className="logoIcon" />
        <span className="logoIcon">FleaGo</span>
      </div>
      <form>
        <input
          autoFocus
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginBtn"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Login
        </button>
        {/* {error && <span className="failure">Something went wrong!</span>} */}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
