import { useState, useEffect, useRef, useContext, Fragment } from "react";
import axios from "../../api/axios";

import AuthContext from "../../context/AuthProvider";
import "./Login.css";

const LOGIN_URL = "/authenticate";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errorRef = useRef();
  const initialToken = localStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);

  useEffect(() => {
    // emailRef.current.focus(); //Focus on first input box
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response?.data[0]);
      console.log(response?.data[0]?.token);

      const token = response?.data[0]?.token;
      const personalDetails = response?.data[0]?.personalDetails;
      localStorage.setItem("token", token);
      localStorage.setItem("personalDetails", JSON.stringify(personalDetails));

      setAuth({ email, token, personalDetails });
      setEmail("");
      setPassword("");
      setIsLoggedIn(true);
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("The server did not respond");
      } else if (err.response?.status === 400) {
        setErrorMsg("Please check email or password");
      } else if (err.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login failed");
      }

      errorRef.current.focus();
    }
  };

  const handleLogout = () => {
    setAuth({});
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <Fragment>
      {isLoggedIn ? (
        <div>
          <h1>You are logged in!</h1>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <div className="login-body">
          {errorMsg && <p ref={errorRef}>{errorMsg}</p>}
          <img
            src="https://s26162.pcdn.co/wp-content/uploads/2016/05/Avengers.jpg"
            alt="login"
          />
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="username"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="email">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>LOGIN</button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
