import { useState, useEffect } from "react";
import * as api from "../Api/transactions";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

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

  return { transactions, add, update, remove };
};
