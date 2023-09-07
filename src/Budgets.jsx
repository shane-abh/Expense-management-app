import React, { useState } from "react";
import Header from "./Header";
import { expenseOptions } from "./data/data.js";
import "./css/Budgets.css";

const Budgets = () => {
  const authenticatedUser =
    JSON.parse(sessionStorage.getItem("authenticatedUser")) || "empty";

  console.log(`user${authenticatedUser.id}`);
  const userData = JSON.parse(
    localStorage.getItem(`user${authenticatedUser.id}`)
  );

  const [selectedValue, setSelectedValue] = useState("Category");
  const [amount, setAmount] = useState(0);

  const handleSelect = () => {
    setSelectedValue(event.target.value);
  };

  function updateUserData(userData) {
    const userDataJSON = JSON.stringify(userData);
    localStorage.setItem(`user${authenticatedUser.id}`, userDataJSON);
  }

  const handleSubmit = () => {
    event.preventDefault();

    userData.budgetCategories.push({
        id: selectedValue.toLowerCase(),
        name: selectedValue,
        budget: amount,
      });

    const transactions = userData.transactions;
    const budgetCategories = userData.budgetCategories;

    const budgetVsActuals = [];

    budgetCategories.forEach((category) => {
      const budgetCategory = {
        category: category.name,
        budget: category.budget,
        actual: 0,
      };

      // Calculate actual expenses for the category
      const categoryTransactions = transactions.filter(
        (transaction) =>
          transaction.category.toLowerCase() === category.name.toLowerCase()
      );

      budgetCategory.actual = categoryTransactions.reduce(
        (total, transaction) => {
          if (transaction.type === "Expense") {
            return parseFloat(total) + parseFloat(transaction.amount);
          }
          return total;
        },
        0
      );

      budgetVsActuals.push(budgetCategory);
    });
    userData.dashboardData.budgetVsActuals = budgetVsActuals;
    console.log(budgetVsActuals)
    updateUserData(userData)
  };
  return (
    <div>
      <Header />
      <h2>Budget Management</h2>
      <form className="budget-form">
        <label htmlFor="category">Choose your Category:</label>
        <select
          name="category"
          id="category"
          onChange={handleSelect}
          value={selectedValue}
        >
          {expenseOptions.map((item, key) => {
            return (
              <option value={item} key={key}>
                {item}
              </option>
            );
          })}
        </select>

        <label htmlFor="budgetAmount">Enter budget amount:</label>
        <input
          type="number"
          id="budgetAmount"
          name="budgetAmount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
        <br />

        <button type="submit" onSubmit={handleSubmit} onClick={handleSubmit}>Add</button>
      </form>
    </div>
  );
};

export default Budgets;
