import React from "react";
import styles from "../Styles/TransactionList.module.css";

const TransactionList = ({ transactions, removeTransaction, setEditing }) => {
  const handleDelete = (tx) => {
    if (
      window.confirm(
        `Are you sure you want to delete this transaction?\n${tx.category}: $${tx.amount.toFixed(2)}`,
      )
    ) {
      removeTransaction(tx.id);
    }
  };

  return (
    <div className={`${styles.list} card`}>
      <div className={styles.header}>
        <h2>Transactions</h2>
        <span className={styles.count}>{transactions.length} records</span>
      </div>

      {transactions.length === 0 ? (
        <p style={{ margin: 0, color: "var(--muted)" }}>
          No transactions yet — add one using the form on the left.
        </p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className={tx.amount > 0 ? styles.income : styles.expense}
            >
              <div className={styles.row}>
                <div>
                  <div className={styles.meta}>
                    <span className={styles.category}>{tx.category}</span>
                    <span className={styles.date}>
                      {new Date(tx.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.desc}>{tx.description}</div>
                </div>
                <div className={styles.actions}>
                  <span className={styles.amount}>${tx.amount.toFixed(2)}</span>
                  <button onClick={() => setEditing(tx)} className="secondary">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(tx)} className="danger">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
