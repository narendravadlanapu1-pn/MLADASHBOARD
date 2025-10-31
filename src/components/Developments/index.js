import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

function Developments() {
  const { mlaName } = useParams();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/projects/${mlaName}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [mlaName]);

  const filtered = projects.filter(
    (p) => filter === "All" || p.status === filter
  );

  const totalBudget = projects.reduce(
    (acc, p) => acc + parseInt(p.budget.replace(/\D/g, "")),
    0
  );
  const totalSpent = projects.reduce(
    (acc, p) => acc + parseInt(p.spent.replace(/\D/g, "")),
    0
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="developments-page">
      <h1 className="page-heading">{mlaName}'s Development Activities 🏗️</h1>

      <div className="budget-summary">
        <p><strong>Total Budget:</strong> ₹{totalBudget} Lakhs</p>
        <p><strong>Total Spent:</strong> ₹{totalSpent} Lakhs</p>
      </div>

      <div className="filter-buttons">
        {["All", "Completed", "In Progress", "Pending"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={filter === status ? "active" : ""}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="projects-container">
        {filtered.length > 0 ? (
          filtered.map((p, i) => (
            <div className="project-card" key={i}>
              <h3>{p.title}</h3>
              <p><strong>Village:</strong> {p.village}</p>
              <p><strong>Budget:</strong> {p.budget}</p>
              <p><strong>Spent:</strong> {p.spent}</p>
              <p><strong>Status:</strong> {p.status}</p>
              <p><strong>Progress:</strong> {p.progress}%</p>
            </div>
          ))
        ) : (
          <p>No projects found 🔎</p>
        )}
      </div>
    </div>
  );
}

export default Developments;
