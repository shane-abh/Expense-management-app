import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./css/Registration.css";

const Registration = () => {
  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random().toString(36).substring(2, 7);
    const uniqueID = `${timestamp}-${randomNumber}`;

    return uniqueID;
  }

  const [data, setData] = useState({
    id: generateUniqueId(),
    name: " ",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //if data is valid
    if (data != null) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      //validation
      // Check if the email is already registered
      const isEmailTaken = users.some((user) => user.email === data.email);
      if (isEmailTaken) {
        // alert("Email already registered. Please use a different email.");

        return;
      }

      users.push(data);
      // add user to local storage
      localStorage.setItem("users", JSON.stringify(users));

      //set new transaction dataset in local storage under this user' id
      const userData = {
        user: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        transactions: [],
        budgetCategories: [],
        dashboardData: {
          totalIncome: 0,
          totalExpenses: 0,
          overallSavings: 0,
          expensesOverTime: [],
          budgetVsActuals: [],
        },
      };

      localStorage.setItem(`user${data.id}`, JSON.stringify(userData));

      console.log(" Go to login page");
    }
  };

  return (
    <form>
      <MDBContainer
        fluid
        className="d-flex align-items-center justify-content-center bg-image"
      >
        <div className="mask gradient-custom-3"></div>
        <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
          <MDBCardBody className="px-5">
            <h2 className="text-uppercase text-center mb-5">
              Create an account
            </h2>
            <MDBInput
              wrapperClass="mb-4"
              label="Your Name"
              size="lg"
              id="form1"
              type="text"
              value={data.name}
              onChange={handleChange}
              name="name"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Your Email"
              size="lg"
              id="form2"
              type="email"
              value={data.email}
              onChange={handleChange}
              name="email"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              size="lg"
              id="form3"
              type="password"
              value={data.password}
              onChange={handleChange}
              name="password"
            />

            <MDBBtn
              className="mb-4 w-100 gradient-custom-5"
              size="lg"
              onClick={handleSubmit}
            >
              Register
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
};

export default Registration;
