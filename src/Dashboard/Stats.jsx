import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import '../css/Stats.css'

const Stats = ({ userData, statsData, setStatsData, updateUserDataInLocalStorage }) => {
  
  if (userData) {
    const transactions = userData.transactions;
    const budgetCategories = userData.budgetCategories;

    // Calculate total income, total expenses, and overall savings
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        totalIncome += parseFloat(transaction.amount);
      } else if (transaction.type === "Expense") {
        totalExpenses += parseFloat(transaction.amount);
      }
    });

    const overallSavings = totalIncome - totalExpenses;
    useEffect(() => {
      setStatsData({
        totalIncome,
        totalExpenses,
        overallSavings,
      });
    }, []);

    // Update dashboard data
    userData.dashboardData.totalIncome = statsData.totalIncome;
    userData.dashboardData.totalExpenses = statsData.totalExpenses;
    userData.dashboardData.overallSavings = statsData.overallSavings;

    updateUserDataInLocalStorage(userData)
  }
  return (
    <div className="cards">
        <div className="card">
            <h2>Income</h2>
            <p className="income">{statsData.totalIncome}</p>
        </div>
        <div className="card">
            <h2>Expense</h2>
            <p className="expense">{statsData.totalExpenses}</p>
        </div>
        <div className="card">
            <h2>Overall Savings</h2>
            <p className="savings">{statsData.overallSavings}</p>
        </div>
    </div>
  );
};

export default Stats;
