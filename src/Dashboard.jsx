import React, { useState } from "react";
import Stats from "./Dashboard/Stats";
import PieChart from "./Dashboard/PieChart";
import ExpenseChart from "./Dashboard/ExpenseChart";
import Header from "./Header";

const Dashboard = () => {
  const authenticatedUser =
    JSON.parse(sessionStorage.getItem("authenticatedUser")) || {};

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
        <Header/>
      <Stats
        userData={userData}
        statsData={statsData}
        setStatsData={setStatsData}
        updateUserDataInLocalStorage= {updateUserDataInLocalStorage}
      />

      <PieChart statsData={statsData}/>

      <ExpenseChart userData={userData}/>
    </div>
  );
};

export default Dashboard;
