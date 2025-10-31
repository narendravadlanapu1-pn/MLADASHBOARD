import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class MLADashboard extends Component {
  state = { mlas: [] };

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:5000/mlas");
      const data = await response.json();
      this.setState({ mlas: data });
    } catch (error) {
      console.error("Error fetching MLAs:", error);
    }
  }

  render() {
    const { mlas } = this.state;

    return (
      <div className="mla-dashboard">
        <h1 className="mla-heading">MLA Dashboard</h1>
        <div className="mla-grid">
          {mlas.map((mla) => (
            <Link
              key={mla.id}
              to={`/mla/${mla.id}`} // 👈 Navigate to MLA details by ID
              className="mla-card"
            >
              <img src={mla.photo} alt={mla.name} className="mla-photo" />
              <h3>{mla.name}</h3>
              <p>{mla.party}</p>
              <p>{mla.constituency}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default MLADashboard;
