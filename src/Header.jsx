import React, { useEffect, useState } from "react";
import './css/Header.css'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div>
      <header className={`header ${menuOpen ? "menu-open" : ""}`}>
        <div className="logo">
          <h2>Expense Manager</h2>
        </div>
       
        <nav className="nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/dasboard">Dashboard</a>
            </li>
            <li>
              <a href="/transaction">Transactions</a>
            </li>
            <li>
              <a href="/budgets">Budgets</a>
            </li>
            <li>
              <a href="/budgets">Log Out</a>
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
