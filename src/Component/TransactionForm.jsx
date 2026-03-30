import React, { useState, useEffect } from "react";
import styles from "../Styles/TransactionForm.module.css";

const TransactionForm = ({
  addTransaction,
  updateTransaction,
  editing,
  setEditing,
}) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [description, setDescription] = useState("");

  const incomeCategories = ["Salary", "Bonus", "Others"];
  const expenseCategories = [
    "Food",
    "Rent",
    "Shopping",
    "Recharge/Bills",
    "Personal care",
    "Gym",
    "Vehicle maintainance",
    "Groccery",
    "Transport/Travel",
    "Others",
  ];

  const availableCategories =
    type === "income" ? incomeCategories : expenseCategories;

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    const categories =
      selectedType === "income" ? incomeCategories : expenseCategories;
    if (!categories.includes(category)) {
      setCategory("");
    }
  };

  useEffect(() => {
    if (editing) {
      setAmount(Math.abs(editing.amount));
      setType(editing.amount < 0 ? "expense" : "income");
      setCategory(editing.category);
      setDate(editing.date.slice(0, 10));
      setDescription(editing.description || "");
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      amount: type === "expense" ? -parseFloat(amount) : parseFloat(amount),
      category,
      date,
      description,
    };
    if (editing) {
      updateTransaction(editing.id, transaction);
      setEditing(null);
    } else {
      addTransaction(transaction);
    }
    setAmount("");
    setType("expense");
    setCategory("");
    setDate(() => {
      const today = new Date();
      return today.toISOString().split("T")[0];
    });
    setDescription("");
  };

  const handleCancel = () => {
    setEditing(null);
    setAmount("");
    setCategory("");
    setDate(() => {
      const today = new Date();
      return today.toISOString().split("T")[0];
    });
    setDescription("");
  };

  return (
    <form className={`${styles.form} card`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label>
          Type
          <select value={type} onChange={handleTypeChange}>
            <option value="expense">Expense (Debit)</option>
            <option value="income">Income (Credit)</option>
          </select>
        </label>
        <label>
          Amount
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
      </div>

      <div className={styles.row}>
        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Time
          <input
            type="time"
            value={date.slice(11, 16)}
            onChange={(e) => setDate(date.slice(0, 10) + "T" + e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            placeholder="Optional notes"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>

      <div className={styles.actions}>
        <button type="submit" className="primary">
          {editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button type="button" className="secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
