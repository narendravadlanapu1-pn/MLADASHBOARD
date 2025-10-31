import React, { Component } from "react";
import "./style.css";
import { Navigate } from "react-router-dom";

class Regpage extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    message: "",
    redirectToLogin: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ message: "❌ Passwords do not match!" });
      return;
    }

    try {
      // ✅ Make sure this matches your backend port (5000)
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({ message: "✅ Registration successful!" });
        setTimeout(() => this.setState({ redirectToLogin: true }), 1000);
      } else {
        this.setState({ message: data.message || "Registration failed ❌" });
      }
    } catch (error) {
      this.setState({ message: "⚠️ Server not reachable!" });
    }
  };

  render() {
    const { username, password, confirmPassword, message, redirectToLogin } = this.state;

    if (redirectToLogin) {
      return <Navigate to="/login"  />;
    }

    return (
      <div className="register-container">
        <div className="register-card">
          <div className="register-left">
            <img
              src="https://res.cloudinary.com/dcrhevbbx/image/upload/v1761187597/Security.93977d2cb88c37ad8e54e961e54cef5f_razvil.svg"
              alt="registration"
              className="register-img"
            />
          </div>

          <div className="register-right">
            <h2 className="register-title">Create Account</h2>

            <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                <img src="https://img.icons8.com/ios-filled/24/000000/user.png" alt="username" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <img src="https://img.icons8.com/ios-filled/24/000000/lock-2.png" alt="password" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <img src="https://img.icons8.com/ios-filled/24/000000/lock-2.png" alt="confirm" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn">Register</button>
            </form>

            <p className="message">{message}</p>
            <p className="switch">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Regpage;
