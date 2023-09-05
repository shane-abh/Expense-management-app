import React, { Fragment, useState } from "react";

import ReadOnlyRow from "./TranasctionsTable/ReadOnlyRow";
import EditableRow from "./TranasctionsTable/EditableRow";

const TransactionList = ({ authenticatedUser }) => {
  const userData = JSON.parse(
    localStorage.getItem(`user${authenticatedUser.id}`)
  );

  const updateBalance = () => {
    let balance = 0;
    userData.transactions.forEach((transaction, i) => {
      balance +=
        transaction.type === "Income"
          ? transaction.amount
          : -transaction.amount;

      userData.transactions[i].balance = balance;
    });
  };
  updateBalance();
  console.log(userData.transactions);
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

    setTableData(newTransactions)
    setEditTransactionID(null)
  };


  const handleCancelClick = () => {
    setEditTransactionID(null)
  }

  const handleDeleteClick = (index) => {
    const newTransaction = [...tableData];
    // const index = editTransactionID;

    newTransaction.splice(index, 1);

    setTableData(newTransaction)
  }

  return (
    <div>
      <form onSubmit={handleEditFormSubmit}>
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
      </form>
    </div>
  );
};

export default TransactionList;
