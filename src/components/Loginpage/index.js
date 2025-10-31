import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./index.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (username==="" || password==="") {
      setErrorMsg("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Login successful 🎉");
        localStorage.setItem("token", data.token || "dummyToken");
        // ✅ Redirect after short delay
        setTimeout(() => setRedirectToHome(true), 1000);
      } else {
        setErrorMsg(data.message || "Invalid credentials ❌");
      }
    } catch (error) {
      setErrorMsg("⚠️ Server not reachable!");
    }
  };

  // ✅ Redirect user to /home once login is successful
  if (redirectToHome) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
          alt="login-logo"
          className="login-logo"
        />
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        {errorMsg && <p className="error">{errorMsg}</p>}
        {successMsg && <p className="success">{successMsg}</p>}

        <p className="switch">
          Don’t have an account? <a href="/">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
