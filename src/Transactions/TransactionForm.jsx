import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import "../css/Transaction.css";

const TransactionForm = ({ authenticatedUser, updateTransactions }) => {
  const userData = JSON.parse(
    localStorage.getItem(`user${authenticatedUser.id}`)
  );

  const [isIncome, setIsIncome] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSelect = (e) => {
    setSelectedValue(e.target.value);
  };

  const toggleSwitch = () => {
    setIsIncome(!isIncome);
  };

  const incomeOptions = [
    "Salary",
    "Investment Dividends",
    "Stocks",
    "Tax Returns",
    "Freelance Earnings",
    "Bonus or Commission",
    "Rental Income",
    "Alimony or Child Support",
    "Gift Income",
    "Interest Income",
  ];

  const expenseOptions = [
    "Groceries",
    "Shopping",
    "Entertainment",
    "Eat Out",
    "Utilities",
    "Transportation",
    "Health Insurance",
    "Education Expenses",
    "Vacation",
    "Rent or Mortgage",
  ];

  //Dialog
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const categoriesData = isIncome ? incomeOptions : expenseOptions;

  function updateBudgetVSActuals(userData) {
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
    console.log(budgetVsActuals);
    updateTransactions(userData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData) {
      const transactions = userData.transactions || [];

      if (
        date == "" ||
        selectedValue == "Category" ||
        amount == "" ||
        description == ""
      ) {
        alert("invalid inputs");
        return;
      }

      transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

      let balance = 0;
      // // Recalculate balances for all transactions
      transactions.forEach((transaction, i) => {
        if (transaction.type === "Income") {
          balance += transaction.amount;
        } else if (transaction.type === "Expense") {
          balance -= transaction.amount;
        }

        transaction.balance = balance;
      });

      // Add the current transaction's amount to the balance
      if (isIncome) {
        balance += parseFloat(amount);
      } else {
        balance -= parseFloat(amount);
      }

      const newTransactionData = {
        type: isIncome ? "Income" : "Expense",
        date: date,
        category: selectedValue,
        amount: amount,
        description: description,
        balance: balance,
      };

      userData.transactions.push(newTransactionData);

      console.log(newTransactionData);

      updateTransactions(userData);
      updateBudgetVSActuals(userData);

      const userDataJSON = JSON.stringify(userData);
      localStorage.setItem(`user${authenticatedUser.id}`, userDataJSON);

      setBasicModal(true);
      handleReset();
    }
  };

  const handleReset = () => {
     setSelectedValue("");
     setAmount(0.0);
     setDescription("");
     setDate(new Date());
  };
  return (
    <MDBCard
      className="bg-dark text-white my-5 mx-auto"
      style={{ borderRadius: "1rem", maxWidth: "800px" }}
    >
      <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
        <h2 className="fw-bold mb-2 text-uppercase text-center">Add New Transaction</h2>
        <p className="text-white-50 mb-5">
          Please enter your Transaction details!
        </p>

        {/* <label htmlFor='income'> <input type='radio' name='Income' id='income'/>  Income</label> */}

        <div className="form-check form-switch">
          <input
            className="form-check-input fs-4 mt-2"
            type="checkbox"
            id="toggleSwitch"
            checked={isIncome}
            onChange={toggleSwitch}
            required
          />
          <label className="form-check-label mb-2 fs-4" htmlFor="toggleSwitch">
            {isIncome ? "Income" : "Expense"}
          </label>
        </div>

        <select
          id="category"
          className="select mb-4 w-100"
          onChange={handleSelect}
          required
        >
          <option>Category</option>
          {categoriesData.map((item, key) => {
            return (
              <option value={item} key={key}>
                {item}
              </option>
            );
          })}
        </select>

        <MDBInput
          wrapperClass="mb-4 mx-5 w-100"
          labelClass="text-white"
          label="Amount"
          id="formControlLg"
          type="number"
          size="lg"
          style={{ color: "white" }}
          value={amount}
          onChange={(e) => {
            setAmount(parseFloat(e.target.value));
          }}
          required
        />
        <MDBInput
          wrapperClass="mb-4 mx-5 w-100"
          labelClass="text-white"
          label="Description"
          id="formControlLg"
          type="text"
          size="lg"
          style={{ color: "white" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <MDBBtn
          outline
          className="mx-2 px-5 mt-5"
          color="white"
          size="lg"
          onClick={handleSubmit}
        >
          Add
        </MDBBtn>
      </MDBCardBody>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle style={{ color: "black" }}>
                Modal title
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ color: "black" }}>
              Transaction Added
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBCard>
  );
};

export default TransactionForm;
