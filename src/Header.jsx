import React, { useEffect, useState } from "react";
import "./css/Header.css";
import { Navigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("authenticatedUser") !== null
  );
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogOut = () => {
    sessionStorage.removeItem("authenticatedUser");
    setIsLoggedIn(false)
    Navigate('/')

  }

  return (
    <div>
      <header className={`header ${menuOpen ? "menu-open" : ""}`}>
        <div className="logo">
          <h2>BudgetBee</h2>
        </div>

        <nav className="nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              
              
              
              <a href={isLoggedIn? "/Expense-management-app/dashboard": "/Expense-management-app/login"}>Dashboard</a>
            </li>
            <li>
              <a href={isLoggedIn? "/Expense-management-app/transaction" : "/Expense-management-app/login"}>Transactions</a>
            </li>
            <li>
              <a href={isLoggedIn? "/Expense-management-app/budgets" : "/Expense-management-app/login"}>Budgets</a>
            </li>
            <li>
              {isLoggedIn? <a href="/Expense-management-app" onClick={handleLogOut}>Log Out</a>:  <a href= "/Expense-management-app/login">Log In</a>}
            </li>
          </ul>
        </nav>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
      </header>
    </div>
  );
};

export default Header;
