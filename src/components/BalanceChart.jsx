import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

const BalanceChart = (props) => {
  const data = {
    labels: props.dates,
    datasets: [
      {
        label: 'Total Balance (₹)',
        data: props.amounts,
        borderColor: '#4c8bf5',
        backgroundColor: 'rgba(76, 139, 245, 0.2)',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      title: {
        display: true,
        text: 'Balance Over Time',
        font: {
          size: 18,
        },
        color: '#ffffff' // Title color (Change to any color you want)
      },
      legend: { 
        display: false 
      },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: '#ffffff' // X-axis label color
        },
        ticks: {
          color: '#ffffff' // X-axis text color
        },
        grid: {
          color: '#777777' // X-axis grid line color
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Balance (₹)',
          color: '#ffffff' // Y-axis label color
        },
        ticks: {
            stepSize: 1000,
          color: '#ffffff', // Y-axis text color
          callback: function (value) {
            return value >= 1000 ? `${value / 1000}k₹` : `${value}₹`;
          }
        },
        grid: {
          color: '#777777' // Y-axis grid line color
        }
      }
    }
  };

  return <Line data={data} options={options} height={100} />;
};

export default BalanceChart;
