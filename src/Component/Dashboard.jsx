import React from "react";
import styles from "../Styles/Dashboard.module.css";

const Dashboard = ({ transactions }) => {
  const income = transactions
    .filter((tx) => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);
  const expenses = transactions
    .filter((tx) => tx.amount < 0)
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  const balance = income - expenses;

  return (
    <div className={`${styles.dashboard} card`}>
      <h2>Overview</h2>
      <div className={styles.row}>
        <div className={styles.item}>
          <div className={styles.label}>Income</div>
          <div className={styles.value}>${income.toFixed(2)}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Expenses</div>
          <div className={styles.value}>${expenses.toFixed(2)}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Balance</div>
          <div className={styles.value}>
            {balance >= 0
              ? `$${balance.toFixed(2)}`
              : `-$${Math.abs(balance).toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
