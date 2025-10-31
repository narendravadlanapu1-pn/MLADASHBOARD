import React, { Component } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

function withRouter(ComponentClass) {
  return (props) => {
    const params = useParams();
    return <ComponentClass {...props} params={params} />;
  };
}

class MlaDetails extends Component {
  state = { mla: null, projects: [] };

  async componentDidMount() {
    const { id } = this.props.params;

    try {
      // Fetch MLA list
      const mlaResponse = await fetch("http://localhost:5000/mlas");
      const mlas = await mlaResponse.json();
      const mla = mlas.find((m) => m.id === parseInt(id));

      // Fetch MLA’s projects
      const projectResponse = await fetch(
        `http://localhost:5000/mlas/${id}/projects`
      );
      const projects = await projectResponse.json();

      this.setState({ mla, projects });
    } catch (error) {
      console.error("Error fetching MLA details:", error);
    }
  }

  render() {
    const { mla, projects } = this.state;

    if (!mla) return <h2>Loading...</h2>;

    return (
      <div className="mla-details-page">
        <div className="mla-profile">
          <img src={mla.photo} alt={mla.name} className="mla-detail-photo" />
          <h2>{mla.name}</h2>
          <p><strong>Party:</strong> {mla.party}</p>
          <p><strong>Constituency:</strong> {mla.constituency}</p>
          <p><strong>Contact:</strong> {mla.contact}</p>
        </div>

        <div className="mla-projects">
          <h3>Projects by {mla.name}</h3>
          <ul>
            {projects.map((project) => (
              <li key={project.id} className="project-card">
                <h4>{project.name}</h4>
                <p>Budget: ₹{project.budget.toLocaleString()}</p>
                <p>Status: {project.status}</p>
                <p>Progress: {project.progress}%</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(MlaDetails);
