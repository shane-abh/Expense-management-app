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
import "./css/Transaction.css";
import TransactionForm from "./Transactions/TransactionForm";
import TransactionList from "./Transactions/TransactionList";
import Header from "./Header";

const Transactions = () => {
  const authenticatedUser =
    JSON.parse(sessionStorage.getItem("authenticatedUser")) || {};
    if(authenticatedUser=={}){
      navigate('/login')
    }
  console.log(`user${authenticatedUser.id}`);
  const userData = JSON.parse(
    localStorage.getItem(`user${authenticatedUser.id}`)
  );

  const [transactions, setTransactions] = useState(userData);
  return (
    <div>
      <Header/>
      <TransactionForm
        authenticatedUser={authenticatedUser}
        updateTransactions={setTransactions}
      />

      <TransactionList
        authenticatedUser={authenticatedUser}
        transactions={transactions}
      />
    </div>
  );
};

export default Transactions;
