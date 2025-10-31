import { Component } from "react";
import { Bar, Pie } from "react-chartjs-2";
import 'chart.js/auto';
import './index.css';

class Report extends Component {
  state = {
    mlasPerformance: [
      { name: "Kunamneni Sambasiva Rao", completed: 12, inProgress: 3 },
      { name: "Thummala Nageswara Rao", completed: 10, inProgress: 4 },
      { name: "Harish Rao", completed: 14, inProgress: 2 },
      { name: "Venkata Ramana Reddy", completed: 9, inProgress: 5 },
      { name: "Malla Reddy", completed: 8, inProgress: 6 },
      { name: "Gangula Kamalakar", completed: 11, inProgress: 3 },
    ],

    projectStatus: {
      completed: 40,
      inProgress: 25,
      delayed: 10,
    },
  };

  downloadReport = () => {
    alert("📄 Report download feature will be added once backend integration is done.");
  };

  render() {
    const { mlasPerformance, projectStatus } = this.state;

    // 🟦 Bar Chart for MLA Performance
    const mlaPerformanceData = {
      labels: mlasPerformance.map((mla) => mla.name),
      datasets: [
        {
          label: "Completed Projects ✅",
          data: mlasPerformance.map((mla) => mla.completed),
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderRadius: 8,
        },
        {
          label: "In Progress Projects 🚧",
          data: mlasPerformance.map((mla) => mla.inProgress),
          backgroundColor: "rgba(255, 206, 86, 0.7)",
          borderRadius: 8,
        },
      ],
    };

    // 🟢 Pie Chart for Project Status Overview
    const projectStatusData = {
      labels: ["Completed ✅", "In Progress 🚧", "Delayed ⚠️"],
      datasets: [
        {
          data: [
            projectStatus.completed,
            projectStatus.inProgress,
            projectStatus.delayed,
          ],
          backgroundColor: [
            "rgba(75, 192, 192, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(255, 99, 132, 0.8)",
          ],
          borderColor: ["#fff"],
          borderWidth: 2,
        },
      ],
    };

    return (
      <div className="report-page">
        <h1 className="report-title">📊 MLA Development Analytics Dashboard</h1>
        <p className="report-subtitle">
          Visual overview of MLA performance and project completion statistics.
        </p>

        {/* 🔹 Bar Chart Section */}
        <section className="chart-section">
          <h2 className="chart-heading">MLA-wise Project Performance</h2>
          <div className="chart-container">
            <Bar
              data={mlaPerformanceData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: "Number of Projects" },
                  },
                },
              }}
            />
          </div>
        </section>

        {/* 🔹 Pie Chart Section */}
        <section className="chart-section">
          <h2 className="chart-heading">Overall Project Status Summary</h2>
          <div className="chart-container pie">
            <Pie
              data={projectStatusData}
              options={{
                plugins: {
                  legend: { position: "bottom" },
                },
              }}
            />
          </div>
        </section>

        <div className="download-container">
          <button className="download-btn" onClick={this.downloadReport}>
            💾 Download Full Report
          </button>
        </div>
      </div>
    );
  }
}

export default Report;
