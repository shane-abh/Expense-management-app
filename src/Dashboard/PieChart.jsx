import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ statsData }) => {
  let legendColor =  "black";

  const data = {
    labels: ["Income", "Expense", "Savings"],
    datasets: [
      {
        data: [
          statsData.totalIncome,
          statsData.totalExpenses,
          statsData.overallSavings,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#22CFCF"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: legendColor,
          font: {
            size: 15,
          },
        },
      },
    },
  };
  return (
    <div>
      <div style={{ maxWidth: "300px", margin: "10px auto" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
