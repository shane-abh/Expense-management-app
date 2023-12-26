import React, { Fragment, useEffect, useState } from "react";

import ReadOnlyRow from "./TranasctionsTable/ReadOnlyRow";
import EditableRow from "./TranasctionsTable/EditableRow";

const TransactionList = ({ authenticatedUser , transactions}) => {

  const userData = JSON.parse(
    localStorage.getItem(`user${authenticatedUser.id}`)
  );

  useEffect(() => {
    // This effect will run whenever transactions change
    // You can perform any actions needed when the data updates
    console.log('Transactions updated:', transactions);

    if(transactions)
    setTableData(transactions.transactions)


  }, [transactions]);

  const updateBalance = () => {
    let balance = 0;
    userData.transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

    userData.transactions.forEach((transaction, i) => {
      if (transaction.amount == "") {
        return;
      } else {
        balance +=
          transaction.type === "Income"
            ? parseFloat(transaction.amount)
            : -parseFloat(transaction.amount);
      }
      userData.transactions[i].balance = balance;
    });
  };
  updateBalance();
  

  const [tableData, setTableData] = useState(userData.transactions);



  const [editTransactionID, setEditTransactionID] = useState(null);

  const [editedFormData, setEditedFormData] = useState({
    type: " ",
    date: "",
    category: "",
    amount: "",
    description: "",
    balance: "",
  });

  const updateUserDataInLocalStorage = (userData) => {
    const userDataJSON = JSON.stringify(userData);
    localStorage.setItem(`user${authenticatedUser.id}`, userDataJSON);
  };
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {
      ...editedFormData,
    };
    newFormData[fieldName] = fieldValue;

    setEditedFormData(newFormData);
  };

  const handleEditClick = (event, index, transactionItem) => {
    event.preventDefault();
    setEditTransactionID(index);

    //this is to pre populate the inputs with data
    const formValues = {
      type: transactionItem.type,
      date: transactionItem.date,
      category: transactionItem.category,
      amount: transactionItem.amount,
      description: transactionItem.description,
      balance: transactionItem.balance,
    };

    setEditedFormData(formValues);
  };

  const handleEditFormSubmit = () => {
    event.preventDefault();

    const editedData = {
      type: editedFormData.type,
      date: editedFormData.date,
      category: editedFormData.category,
      amount: editedFormData.amount,
      description: editedFormData.description,
      balance: editedFormData.balance,
    };

    const newTransactions = [...tableData];

    const index = editTransactionID;

    newTransactions[index] = editedData;

    newTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));

    let bal = 0;
    newTransactions.forEach((transaction, i) => {
      if (transaction.amount === "") {
        return null;
      } else {
        bal +=
          transaction.type === "Income"
            ? parseFloat(transaction.amount)
            : -parseFloat(transaction.amount);
      }

      newTransactions[i].balance = bal;
    });
    console.log(newTransactions);

    setTableData(newTransactions);
    userData.transactions = newTransactions;

    updateUserDataInLocalStorage(userData);
    setEditTransactionID(null);
  };

  const handleCancelClick = () => {
    setEditTransactionID(null);
  };

  const handleDeleteClick = (index) => {
    const newTransaction = [...tableData];

    newTransaction.splice(index, 1);
    userData.transactions = newTransaction;

    setTableData(newTransaction);
    updateUserDataInLocalStorage(userData);
  };

  return (
    <div>
      <h3>Transaction List</h3>
      <form onSubmit={handleEditFormSubmit}>
        <div className="fixedHead">

        
        <table>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
              <th scope="col">Balance</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
           
            {tableData.map((item, index) => {
              return (
                <>
                  {editTransactionID === index ? (
                    <EditableRow
                      editedFormData={editedFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      item={item}
                      index={index}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </>
              );
            })}
          </tbody>
        </table>
        </div>
      </form>
    </div>
  );
};

export default TransactionList;
