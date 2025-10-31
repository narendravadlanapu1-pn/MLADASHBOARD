import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

// 🔹 Small wrapper to use `navigate` inside a class component
function MLADashboardWrapper() {
  const navigate = useNavigate();
  return <MLADashboard navigate={navigate} />;
}

class MLADashboard extends Component {
  state = {
    mlas: [],
    filteredMlas: [],
    searchQuery: "",
    selectedParty: "All",
    loading: true,
  };

  componentDidMount() {
    this.fetchMLAData();
  }

  fetchMLAData = async () => {
    try {
      const response = await fetch("http://localhost:5000/mlas");
      const data = await response.json();
      this.setState({
        mlas: data,
        filteredMlas: data,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching MLA data:", error);
      this.setState({ loading: false });
    }
  };

  handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    this.setState({ searchQuery: query }, this.applyFilters);
  };

  handleFilterChange = (event) => {
    this.setState({ selectedParty: event.target.value }, this.applyFilters);
  };

  applyFilters = () => {
    const { mlas, searchQuery, selectedParty } = this.state;
    const filtered = mlas.filter((mla) => {
      const matchesSearch =
        mla.name.toLowerCase().includes(searchQuery) ||
        mla.constituency.toLowerCase().includes(searchQuery);

      const matchesParty =
        selectedParty === "All" || mla.party === selectedParty;

      return matchesSearch && matchesParty;
    });

    this.setState({ filteredMlas: filtered });
  };

  handleCardClick = (id) => {
    this.props.navigate(`/mla/${id}`);
  };

  render() {
    const { filteredMlas, loading, selectedParty } = this.state;

    if (loading) return <div className="loading">Loading MLA Data...</div>;

    return (
      <div className="mla-container">
        <h1 className="mla-title">Telangana MLA Dashboard</h1>

        {/* 🔍 Search + Filter Section */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by name or constituency..."
            onChange={this.handleSearch}
            className="search-input"
          />

          <select
            value={selectedParty}
            onChange={this.handleFilterChange}
            className="filter-select"
          >
            <option value="All">All Parties</option>
            <option value="Indian National Congress">
              Indian National Congress
            </option>
            <option value="Bharat Rashtra Samithi">
              Bharat Rashtra Samithi
            </option>
            <option value="Bharatiya Janata Party (BJP)">BJP</option>
          </select>
        </div>

        {/* 🧱 MLA Grid */}
        <div className="mla-grid">
          {filteredMlas.length > 0 ? (
            filteredMlas.map((mla) => (
              <div
                className="mla-card"
                key={mla.id}
                onClick={() => this.handleCardClick(mla.id)}
              >
                <img src={mla.photo} alt={mla.name} className="mla-photo" />
                <h2>{mla.name}</h2>
                <p>
                  <strong>Party:</strong> {mla.party}
                </p>
                <p>
                  <strong>Constituency:</strong> {mla.constituency}
                </p>
                <p>
                  <strong>Contact:</strong> {mla.contact}
                </p>
              </div>
            ))
          ) : (
            <p className="no-results">No MLAs found.</p>
          )}
        </div>
      </div>
    );
  }
}

export default MLADashboardWrapper;
