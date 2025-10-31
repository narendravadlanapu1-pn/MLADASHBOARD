import { Component } from "react";
import "./index.css";

class HomePage extends Component {
  render() {
    return (
      <div className="home-container">
        {/* 🌟 Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Track MLA Activities, Budgets, and Development Projects in Your Area 🇮🇳
            </h1>
            <p className="hero-subtitle">
              Empowering citizens with transparency, accountability, and progress tracking.
            </p>
            <button type="button" className="explore-btn">
              Explore Now
            </button>
          </div>
        </section>

        {/* 📊 Key Stats Section */}
        <section className="stats-section">
          <h2 className="stats-title">Platform Highlights 🌟</h2>
          <div className="stats-container">
            <div className="stat-card">
              <h3>120+</h3>
              <p>Total MLAs Tracked</p>
            </div>
            <div className="stat-card">
              <h3>850+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-card">
              <h3>₹12 Cr+</h3>
              <p>Funds Utilized</p>
            </div>
            <div className="stat-card">
              <h3>96%</h3>
              <p>Public Satisfaction</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage;
