import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import "./index.css";

class Navbar extends Component {
  state = { loggedOut: false };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ loggedOut: true });
  };

  render() {
    if (this.state.loggedOut) {
      return <Navigate to="/login" replace />;
    }

    return (
      <nav className="nav-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dftpcwyzm/image/upload/v1759776939/Emblem_of_India_xdapmk.svg"
            alt="website-logo"
            className="logo"
          />
          <h2 className="logo-title">PublicTrack</h2>
        </div>

        <ul className="nav-links">
          <li><Link className='nav-link-colors' to="/home">Home</Link></li>
          <li><Link className='nav-link-colors' to="/mla">MLA's</Link></li>
          <li><Link className='nav-link-colors' to="/feedback">Feedback</Link></li>
          <li><Link className='nav-link-colors' to="/report">Report</Link></li>
        </ul>

        <div className="btn-container">
          <button type="button" className="logout-btn" onClick={this.handleLogout}>Logout</button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
