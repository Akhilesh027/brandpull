import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './SalesStatistics.css';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function SalesStatistics({ salesData }) {
  // Prepare data for the chart
  const data = {
    labels: salesData.map(data => data.date), // e.g., ['Jan', 'Feb', 'Mar']
    datasets: [
      {
        label: 'Sales Amount',
        data: salesData.map(data => data.amount), // e.g., [500, 700, 600]
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `₹${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="sales-statistics">
      <h3>Sales Statistics</h3>
      <div className="chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default SalesStatistics;
