import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import './App.css'
import Registration from "./Registration";
import Home from "./Home";
import Login from "./Login";
import Transactions from "./Transactions";
import Dashboard from "./Dashboard";
import Budgets from "./Budgets";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("authenticatedUser") !== null
  );
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Expense-management-app" element={<Home />} />
          <Route path="/Expense-management-app/login" element={<Login />} />
          <Route path="/Expense-management-app/registration" element={<Registration />} />
          <Route path="/Expense-management-app/transaction" element={<Transactions />} />
          <Route path="/Expense-management-app/dashboard" element={<Dashboard />} />
          <Route path="/Expense-management-app/budgets" element={<Budgets />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
