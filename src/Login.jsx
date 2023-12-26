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
import Home from "./Home";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email);

    if(user && user.password === password){

      console.log('Logged in')
      sessionStorage.setItem("authenticatedUser", JSON.stringify(user));

      navigate("/transaction");
    }else{
      console.log(`Invalid credentials`)
    }
    

    console.log("Submitted");
  };
  return (
    <>
    
    <Header/>
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                style={{color: "white"}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              required/>
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                style={{color: "white"}}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <p className="small mb-3 pb-lg-2">
                <a className="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>
              <MDBBtn
              type="submit"
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={handleSubmit}
                onSubmit={handleSubmit}
              
              >
                Login
              </MDBBtn>

              <div>
                <p className="mt-4">Don't have an account?</p>
                <a href="/registration" className="text-white-50 fw-bold mx-5">
                  Sign Up
                </a>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </>
  );
};

export default Login;
