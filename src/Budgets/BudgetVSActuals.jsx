import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const BudgetVSActuals = ({userData}) => {
    const budgetVsActuals = userData.dashboardData.budgetVsActuals;

    const categories = []
    const budgetAmounts = []
    const actualAmounts = []

    const cat = []

    const exp = budgetVsActuals.map((item) => {
      if(parseFloat(item.actual)!=0){
        categories.push(item.category);
        budgetAmounts.push(item.budget);
        actualAmounts.push(item.actual)
      }
    })

 

    const legendColor = 'black';

    const data=  {
        labels: categories,
        datasets: [
          {
            label: "Budget",
            data: budgetAmounts,
            backgroundColor: "#00C896", // Bar color for budget
            hoverBackgroundColor: "blue",
          },
          {
            label: "Actual",
            data: actualAmounts,
            backgroundColor: "#00C6CF", // Bar color for actual
            hoverBackgroundColor: "red",
          },
        ],
      }

      const options= {
        responsive: true,
        // maintainAspectRatio: false, // Set to true if you want to maintain aspect ratio
        scales: {
          x: {
            ticks:{
              color: legendColor,
            },
            grid: {
                display:false
            }   
          },
          y: {
            beginAtZero: true,
            ticks:{
              color: legendColor,
            },
            grid: {
                display:false
            }   
          },
        },

        borderRadius: 20,
        barThickness: screen.width > 800 ? 30 : 10,
        plugins: {
          title: {
            display: true,
            text: "Budget vs Actuals",
            font: {
              weight: "bold",
              size: 24,
            },
            color:legendColor,
          },
          tooltip: {
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 14,
            }
          }
        },
      }


  return (
    <div  style={{
        maxWidth: 800,
        backgroundColor: "aliceblue",
        padding: "20px",
        borderRadius: 10,
        margin: "20px auto",
      }}>
        <Bar options={options} data={data} />
    </div>
  )
}

export default BudgetVSActuals