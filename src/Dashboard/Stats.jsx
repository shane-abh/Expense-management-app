import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import "../css/Stats.css";
import income from "../assets/income.svg";
import expense from "../assets/expense.svg";
import savings from "../assets/savings.svg";

const Stats = ({
  userData,
  statsData,
  setStatsData,
  updateUserDataInLocalStorage,
}) => {
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

    updateUserDataInLocalStorage(userData);
  }
  return (
    <div className="cards">
      <div className="card">
        <div className="circle">
          <img src={income} className="cardicon" />
        </div>
        <div>
          <h2>Income</h2>
          <p className="income">{"$"+statsData.totalIncome}</p>
        </div>
      </div>

      <div className="card">
        <div className="circle" style={{backgroundColor: 'rgb(216, 34, 34)'}}>
          <img src={expense} className="cardicon" />
        </div>
        <div>
          <h2>Expense</h2>
          <p className="expense">{"$"+statsData.totalExpenses}</p>
        </div>
      </div>
      <div className="card">
        <div className="circle" style={{backgroundColor:'blue'}}>
          <img src={savings} className="cardicon" />
        </div>
        <div>
          <h2>Overall Savings</h2>
          <p className="savings">{"$"+statsData.overallSavings}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
