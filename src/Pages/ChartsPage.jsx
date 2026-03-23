import React from "react";
import Charts from "../Component/Chart";
import Header from "../Component/Header";

const ChartsPage = ({ transactions }) => {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <section className="section">
          <h2>Spending Analytics</h2>
          <Charts transactions={transactions} />
        </section>
      </main>
    </div>
  );
};

export default ChartsPage;
