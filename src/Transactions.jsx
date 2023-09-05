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

const Transactions = () => {
  const authenticatedUser = JSON.parse(sessionStorage.getItem("authenticatedUser")) || {};

  console.log(`user${authenticatedUser.id}`)
   const userData = JSON.parse(localStorage.getItem(`user${authenticatedUser.id}`))
 
  return (
    <div>

   <TransactionForm authenticatedUser={authenticatedUser}/> 
   <TransactionList authenticatedUser={authenticatedUser}/>
    </div>
  )
};

export default Transactions;
