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
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem(`user${authenticatedUser.id}`))
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

  useEffect(() => {
    // This effect will run whenever transactions change
    // You can perform any actions needed when the data updates

    if (userData) setUserData(userData);
  }, [userData]);

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
      {console.log(userData.budgetCategories.id == [])}
      {userData.budgetCategories.id == [] ? (
        ""
      ) : (
        <BudgetVSActuals userData={userData} />
      )}
    </div>
  );
};

export default Dashboard;
