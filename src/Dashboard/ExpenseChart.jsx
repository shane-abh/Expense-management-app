import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = ({ userData }) => {
  const expenses = userData.transactions;

  const expenseMonths = [];

  const balance = [];

  const expensesData = [];

  const e = expenses.filter((item) => {
    if (item.type == "Expense") {
      expensesData.push(item.amount);
      let month = new Date(item.date).toLocaleString("default", {
        month: "short",
        day: "2-digit",
      });

      expenseMonths.push(month);
      balance.push(item.balance);
    }
  });

  const data = {
    labels: expenseMonths,
    datasets: [
      {
        label: "Expenses",
        data: expensesData,
        borderColor: "#FF5733", // Line color
        fill: false,
      },
    ],
  };

  let legendColor = "black";

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: legendColor,
        },
        title: {
          display: true,
          text: "Expense Chart",
          font: {
            size: 30,
          },
        },
      },
    },
    scales: {
      x: {
        display: true,

        title: {
          display: true,
          text: "Months",
          color: legendColor,
          font: {
            size: 20,
          },
        },
        ticks: { color: legendColor },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Payment Amount ($)",
          color: legendColor,
          font: {
            size: 20,
          },
        },
        ticks: { color: legendColor },
      },
    },
  };

  return (
    <div
      style={{
        maxWidth: 800,
        backgroundColor: "aliceblue",
        padding: "20px",
        borderRadius: 10,
        margin: "20px auto",
      }}
    >
      <Line options={options} data={data} />
    </div>
  );
};

export default ExpenseChart;
