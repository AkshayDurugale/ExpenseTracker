import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import * as api from "../Api/transactions";
import TransactionFormPage from "./TransactionFormPage";
import ChartsPage from "./ChartsPage";
import TransactionListPage from "./TransactionListPage";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    api.getTransactions().then(setTransactions);
  }, []);

  const add = async (transaction) => {
    const newTx = await api.addTransaction(transaction);
    setTransactions((prevTransactions) => [newTx, ...prevTransactions]);
  };

  const update = async (id, transaction) => {
    const updatedTx = await api.updateTransaction(id, transaction);
    setTransactions((prevTransactions) =>
      prevTransactions.map((tx) => (tx.id === id ? updatedTx : tx)),
    );
  };

  const remove = async (id) => {
    try {
      await api.deleteTransaction(id);
      setTransactions((prevTransactions) =>
        prevTransactions.filter((tx) => tx.id !== id),
      );
      return { success: true };
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction. Please try again.");
      return { success: false, error };
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <TransactionFormPage
              add={add}
              update={update}
              editing={editing}
              setEditing={setEditing}
              transactions={transactions}
            />
          }
        />
        <Route
          path="/charts"
          element={<ChartsPage transactions={transactions} />}
        />
        <Route
          path="/transactions"
          element={
            <TransactionListPage
              transactions={transactions}
              setEditing={setEditing}
              remove={remove}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
