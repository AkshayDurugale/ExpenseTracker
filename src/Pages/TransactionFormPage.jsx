import React, { useState } from "react";
import TransactionForm from "../Component/TransactionForm";
import Dashboard from "../Component/Dashboard";
import Header from "../Component/Header";

const TransactionFormPage = ({ transactions, add, update, remove }) => {
  const [editing, setEditing] = useState(null);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <section className="section">
          <h2>Add/Edit Transaction</h2>
          <TransactionForm
            addTransaction={add}
            updateTransaction={update}
            editing={editing}
            setEditing={setEditing}
          />
          <Dashboard transactions={transactions} />
        </section>
      </main>
    </div>
  );
};

export default TransactionFormPage;
