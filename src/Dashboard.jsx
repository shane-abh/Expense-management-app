import React, { useEffect, useState } from "react";
import Stats from "./Dashboard/Stats";
import PieChart from "./Dashboard/PieChart";
import ExpenseChart from "./Dashboard/ExpenseChart";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import BalanceChart from "./Dashboard/BalanceChart";
import "./css/Dashboard.css";
import TransactionList from "./Transactions/TransactionList";
import BudgetVSActuals from "./Budgets/BudgetVSActuals";

const Dashboard = () => {
  const authenticatedUser =
    JSON.parse(sessionStorage.getItem("authenticatedUser")) || "empty";

  console.log(`user${authenticatedUser.id}`);
  const userData = JSON.parse(
    localStorage.getItem(`user${authenticatedUser.id}`)
  );

  const [statsData, setStatsData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    overallSavings: 0,
  });

  const updateUserDataInLocalStorage = (userData) => {
    const userDataJSON = JSON.stringify(userData);
    localStorage.setItem(`user${authenticatedUser.id}`, userDataJSON);
  };

  return (
    <div>
      <Header />
      <Stats
        userData={userData}
        statsData={statsData}
        setStatsData={setStatsData}
        updateUserDataInLocalStorage={updateUserDataInLocalStorage}
      />
      <div className="listoverview">
        <TransactionList
          authenticatedUser={authenticatedUser}
          transactions={userData}
        />
        <PieChart statsData={statsData} />
      </div>
      <div className="charts">
        <ExpenseChart userData={userData} />
        <BalanceChart userData={userData} />
      </div>

      <BudgetVSActuals userData={userData}/>
    </div>
  );
};

export default Dashboard;
