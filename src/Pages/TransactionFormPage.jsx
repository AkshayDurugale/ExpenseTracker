import React from "react";
import TransactionForm from "../Component/TransactionForm";
import Dashboard from "../Component/Dashboard";
import Header from "../Component/Header";

const TransactionFormPage = ({
  add,
  update,
  editing,
  setEditing,
  transactions,
}) => {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <section className="section">
          <Dashboard transactions={transactions} />
          <h2>Add/Edit Transaction</h2>
          <TransactionForm
            addTransaction={add}
            updateTransaction={update}
            editing={editing}
            setEditing={setEditing}
          />
        </section>
      </main>
    </div>
  );
};

export default TransactionFormPage;
