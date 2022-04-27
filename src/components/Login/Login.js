import { useState, useEffect, useRef, useContext, Fragment } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";

const LOGIN_URL = "/authenticate";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

      console.log(JSON.stringify(response));
      console.log(JSON.stringify(response?.data[0]?.token));

      const token = response?.data[0]?.token;
      localStorage.setItem("token", token);

      setAuth({ email, password, token });
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

  return (
    <Fragment>
      {isLoggedIn ? (
        <h1>You are logged in!</h1>
      ) : (
        <div>
          {errorMsg && <p ref={errorRef}>{errorMsg}</p>}
          <h1>Login (image?)</h1>
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
