import { Component } from "react";
import "./index.css";

class Feedback extends Component {
  state = {
    name: "",
    village: "",
    email: "",
    mla: "",
    project: "",
    message: "",
    image: null,
    feedbackList: [],
  };

  handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      this.setState({ image: files[0] });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, village, email, mla, project, message, image, feedbackList } =
      this.state;

    if (!name || !village || !mla || !project || !message) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }

    const newFeedback = {
      name,
      village,
      email,
      mla,
      project,
      message,
      image: image ? URL.createObjectURL(image) : null,
      date: new Date().toLocaleString(),
    };

    this.setState({
      feedbackList: [newFeedback, ...feedbackList],
      name: "",
      village: "",
      email: "",
      mla: "",
      project: "",
      message: "",
      image: null,
    });
  };

  render() {
    const { name, village, email, mla, project, message, feedbackList } =
      this.state;

    return (
      <div className="feedback-page">
        <h1 className="page-heading">Citizen Feedback Portal 🗣️</h1>
        <p className="page-subtitle">
          Share your feedback or complaints regarding MLA development projects.
        </p>

        <form className="feedback-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={name}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="village"
            placeholder="Village / Town *"
            value={village}
            onChange={this.handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            value={email}
            onChange={this.handleChange}
          />

          <select
            name="mla"
            value={mla}
            onChange={this.handleChange}
            required
          >
            <option value="">Select MLA *</option>
            <option value="Revanth Reddy">Revanth Reddy</option>
            <option value="K. T. Rama Rao">K. T. Rama Rao</option>
            <option value="Etela Rajender">Etela Rajender</option>
            <option value="Harish Rao">Harish Rao</option>
          </select>

          <input
            type="text"
            name="project"
            placeholder="Project Name / Area *"
            value={project}
            onChange={this.handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Describe your feedback or issue *"
            value={message}
            onChange={this.handleChange}
            required
          />

          <input
            type="file"
            name="image"
            onChange={this.handleChange}
            accept="image/*"
          />

          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>

        <h2 className="recent-heading">📰 Recent Feedback</h2>
        <div className="feedback-list">
          {feedbackList.length === 0 && (
            <p className="no-feedback">No feedback submitted yet.</p>
          )}
          {feedbackList.map((feedback, index) => (
            <div className="feedback-card" key={index}>
              <div className="feedback-header">
                <h3>{feedback.name}</h3>
                <p className="feedback-date">{feedback.date}</p>
              </div>
              <p>
                <strong>Village:</strong> {feedback.village}
              </p>
              <p>
                <strong>MLA:</strong> {feedback.mla}
              </p>
              <p>
                <strong>Project:</strong> {feedback.project}
              </p>
              <p className="feedback-message">“{feedback.message}”</p>
              {feedback.image && (
                <img
                  src={feedback.image}
                  alt="Proof"
                  className="feedback-img"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Feedback;
