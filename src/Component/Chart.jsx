import React from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import styles from "../Styles/Chart.module.css";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

const Charts = ({ transactions }) => {
  if (!transactions.length) {
    return (
      <div className={styles.charts}>
        <div className={styles.chartCard}>
          <h3>Charts</h3>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            Add a transaction to see your spending breakdown and daily balance.
          </p>
        </div>
      </div>
    );
  }

  const expenseTransactions = transactions.filter((tx) => tx.amount < 0);
  const categories = [...new Set(expenseTransactions.map((tx) => tx.category))];
  const categoryTotals = categories.map((cat) =>
    expenseTransactions
      .filter((tx) => tx.category === cat)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
  );

  const dailyTotals = transactions.reduce((acc, tx) => {
    const day = new Date(tx.date).toLocaleDateString();
    acc[day] = (acc[day] || 0) + tx.amount;
    return acc;
  }, {});
  const lineLabels = Object.keys(dailyTotals);
  const lineData = Object.values(dailyTotals);

  return (
    <div className={styles.charts}>
      <div className={styles.chartCard}>
        <h3>Spending by Category</h3>
        <Pie
          data={{
            labels: categories,
            datasets: [
              {
                data: categoryTotals,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          }}
        />
      </div>

      <div className={styles.chartCard}>
        <h3>Daily Balance</h3>
        <Line
          data={{
            labels: lineLabels,
            datasets: [
              {
                label: "Daily Amount",
                data: lineData,
                borderColor: "#27ae60",
                fill: false,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Charts;
