import React from 'react'
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
  

const BalanceChart = ({userData}) => {
    const expenses = userData.transactions;

    const balanceMonths = [];
  
    const balance = [];
  
    const balanceData = [];
  
    const e = expenses.filter((item) => {
      
        balanceData.push(item.balance);
        let month = new Date(item.date).toLocaleString("default", {
          month: "short",
          day: "2-digit",
        });
  
        balanceMonths.push(month);
        balance.push(item.balance);
      
    });
  
    const data = {
      labels: balanceMonths,
      datasets: [
        {
          label: "Balance",
          data: balanceData,
          borderColor: "green", // Line color
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
            text: "Balance Chart",
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
            text: " Amount ($)",
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
  )
}

export default BalanceChart