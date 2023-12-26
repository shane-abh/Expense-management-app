import React from "react";
import Header from "./Header";
import "./css/Home.css";
import budget from "./assets/budget.svg";
import chart from "./assets/chart.svg";
import heroImage from "./assets/hero-img.jpg";

const Home = () => {
  return (
    <div>
      <Header />

      <div className="homepage">
        <section className="hero">
          <img src={heroImage} className="hero-img" />
          <h1>Manage your expenses like a pro with BudgetBee 🐝</h1>
          <p>
            BudgetBee is a web app that helps you track, analyze, and optimize
            your personal and business expenses. Whether you want to save money,
            plan for the future, or grow your income, BudgetBee has the tools
            you need to achieve your financial goals.
          </p>
          <button className="cta-button">
            <a href="./registration">Sign Up for Free</a>
          </button>
        </section>

        <section className="features">
          <h2 className="h2-heading">With BudgetBee, you can:</h2>
          <ul className="home-ul">
            <li className="home-li">
              <div className="icon">
                <img src={chart} alt="chart icon" />
              </div>
              <div className="feature-content">
                <h3>Visualize your spending patterns with charts</h3>
                <p>
                  BudgetBee helps you understand where your money goes with
                  interactive charts and graphs. You can compare your spending
                  by category, time period, or source.
                </p>
              </div>
            </li>
            <li className="home-li">
              <div className="icon">
                <img src={budget} alt="budget icon" />
              </div>
              <div className="feature-content">
                <h3>Set and monitor your budget goals</h3>
                <p>
                  BudgetBee helps you plan ahead and stay on track with your
                  budget goals. You can set monthly or yearly budgets for each
                  category or source of income or expense. You can also see how
                  much you have spent or saved so far and how much you have left
                  to spend or save.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
