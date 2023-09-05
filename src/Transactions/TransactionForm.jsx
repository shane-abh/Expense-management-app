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
} from "mdb-react-ui-kit";
import "../css/Transaction.css";

const TransactionForm = ({authenticatedUser}) => {

  const userData = JSON.parse(localStorage.getItem(`user${authenticatedUser.id}`))


  const [isIncome, setIsIncome] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [amount, setAmount] = useState("");
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

  const categoriesData = isIncome ? incomeOptions : expenseOptions;

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userData) {
      const transactions = userData.transactions || [];

      // transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

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
        balance +=parseFloat( amount);
      } else  {
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
  
      console.log(newTransactionData)

      const userDataJSON = JSON.stringify(userData);
  localStorage.setItem(`user${authenticatedUser.id}`, userDataJSON);

    }

    

   
  };
  return (
    <MDBCard
      className="bg-dark text-white my-5 mx-auto"
      style={{ borderRadius: "1rem", maxWidth: "800px" }}
    >
      <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
        <h2 className="fw-bold mb-2 text-uppercase">Add New Transaction</h2>
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
          />
          <label className="form-check-label mb-2 fs-4" htmlFor="toggleSwitch">
            {isIncome ? "Income" : "Expense"}
          </label>
        </div>

        <select
          id="category"
          className="select mb-4 w-100"
          onChange={handleSelect}
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
          onChange={(e) => setDate(new Date(e.target.value))}
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
    </MDBCard>
  );
};

export default TransactionForm;
