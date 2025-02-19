import { Doughnut } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import { Chart, defaults, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);
defaults.responsive = true;
defaults.maintainAspectRatio = false;

const DonutChart = ({ transactions }) => {
  const [option, setOption] = useState("income");

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 0,
      },
    ],
  });

  
  const generateColor = (category) => {
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
      hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  useEffect(() => {
    const amountMap = {};
  
    
    transactions.forEach((txn) => {
      if (txn.type === option) {
        amountMap[txn.category] = (amountMap[txn.category] || 0) + txn.amount;
      }
    });
  
    let uniqueAmountCategory = Object.keys(amountMap);
    let totalAmountPerCategory = Object.values(amountMap);
    let backgroundColors = uniqueAmountCategory.map((category) =>
      generateColor(category)
    );
  
    if (uniqueAmountCategory.length === 0) {
      uniqueAmountCategory = ["Empty"];
      totalAmountPerCategory = [1]; 
      backgroundColors = ["#ccc"]; 
    }
  
    setChartData({
      labels: uniqueAmountCategory,
      datasets: [
        {
          data: totalAmountPerCategory,
          backgroundColor: backgroundColors,
          borderWidth: 0,
        },
      ],
    });
  }, [option, transactions]);
  

  const optionsConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="d-flex flex-column align-items-center text-white p-3">
      <div className="row gx-5 d-flex justify-content-around">
        <div className="col" style={{ width: "200px", height: "200px" }}>
          <Doughnut data={chartData} options={optionsConfig} />
        </div>
        
        <div className="col  d-flex justify-content-center flex-column">
          <div className="form-check mx-auto ">
            <input
              type="radio"
              className="form-check-input custom-radio"
              id="radio1"
              name="transactionType"
              value="income"
              checked={option === "income"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="radio1">
              Income
            </label>
          </div>

          <div className="form-check my-3 mx-auto">
            <input
              type="radio"
              className="form-check-input custom-radio"
              id="radio2"
              name="transactionType"
              value="expense"
              checked={option === "expense"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="radio2">
              Expense
            </label>
          </div>
        </div>
      </div>
      <div className="col w-100">
        {chartData.labels.map((category, index) => (
          <div key={index} className="d-flex justify-content-between w-100">
            <span>
              <span
                className="me-2"
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                  borderRadius: "50%",
                }}
              ></span>
              {category}
            </span>
            <span className="text-danger fw-bold">
              {chartData.datasets[0].data[index]}₹
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
