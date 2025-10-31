import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";

const MlaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mla, setMla] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch MLA Details + Projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mlaResponse = await fetch(`http://localhost:5000/mlas`);
        const mlaData = await mlaResponse.json();
        const selectedMla = mlaData.find((m) => m.id === parseInt(id));

        if (!selectedMla) {
          setLoading(false);
          return;
        }

        const projectsResponse = await fetch(
          `http://localhost:5000/mlas/${id}/projects`
        );
        const projectData = await projectsResponse.json();

        setMla(selectedMla);
        setProjects(projectData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching MLA details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="mla-loader">Loading MLA details...</div>;
  }

  if (!mla) {
    return (
      <div className="mla-not-found">
        <p>❌ MLA not found!</p>
        <button className="mla-back-btn" onClick={() => navigate("/mla")}>
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="mla-details-container">
      <button className="mla-back-btn" onClick={() => navigate("/mla")}>
        ← Back
      </button>

      <div className="mla-header">
        <img src={mla.photo} alt={mla.name} className="mla-details-photo" />
        <div className="mla-info">
          <h1 className="mla-name">{mla.name}</h1>
          <p><strong>Party:</strong> {mla.party}</p>
          <p><strong>Constituency:</strong> {mla.constituency}</p>
          <p><strong>Contact:</strong> {mla.contact}</p>
        </div>
      </div>

      <h2 className="project-title">Development Projects</h2>

      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p><strong>Budget:</strong> ₹{project.budget.toLocaleString()}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${project.progress}%`,
                    backgroundColor:
                      project.status === "Completed" ? "#4CAF50" : "#FFA500",
                  }}
                ></div>
              </div>
              <p className="progress-text">{project.progress}% Complete</p>
            </div>
          ))
        ) : (
          <p className="no-projects">No projects found for this MLA.</p>
        )}
      </div>
    </div>
  );
};

export default MlaDetails;
