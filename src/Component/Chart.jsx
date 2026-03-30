import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import annotationPlugin from "chartjs-plugin-annotation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../Styles/Chart.module.css";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartDataLabels,
  annotationPlugin,
);

const Charts = ({ transactions }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!transactions.length) {
    return (
      <div className={styles.charts}>
        <div className={styles.chartCard}>
          <h3>Charts</h3>
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

  // Group transactions by date for calendar display
  const transactionsByDate = transactions.reduce((acc, tx) => {
    const dateKey = new Date(tx.date).toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(tx);
    return acc;
  }, {});

  // Calculate daily net amounts for calendar tiles
  const dailyNetAmounts = transactions.reduce((acc, tx) => {
    const dateKey = new Date(tx.date).toDateString();
    acc[dateKey] = (acc[dateKey] || 0) + tx.amount;
    return acc;
  }, {});

  if (!transactions.length) {
    return (
      <div className={styles.graphs}>
        <div className={styles.chartCard}>
          <h3>Spending Analytics</h3>
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            Add some transactions to see your spending analytics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.graphs}>
        {expenseTransactions.length > 0 && (
          <div className={styles.chartCard}>
            <h3>Spending by Category</h3>
            <div>
              <Pie
                data={{
                  labels: categories,
                  datasets: [
                    {
                      data: categoryTotals,
                      backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",
                        "#FF9F40",
                        "#FF6384",
                        "#C9CBCF",
                        "#4BC0C0",
                        "#FF6384",
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    datalabels: {
                      color: "#fff",
                      font: {
                        size: 10,
                        weight: "bold",
                      },
                      formatter: (value, context) => {
                        const label =
                          context.chart.data.labels[context.dataIndex];
                        const total = context.dataset.data.reduce(
                          (a, b) => a + b,
                          0,
                        );
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}\n${percentage}%`;
                      },
                      anchor: "center",
                      align: "center",
                      offset: 0,
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const label = context.label || "";
                          const value = context.parsed;
                          const total = context.dataset.data.reduce(
                            (a, b) => a + b,
                            0,
                          );
                          const percentage = ((value / total) * 100).toFixed(1);
                          return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                        },
                      },
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                      labels: {
                        font: {
                          size: 12,
                        },
                        padding: 10,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}

        {transactions.length > 0 && (
          <div className={styles.chartCard}>
            <h3>Transaction Calendar</h3>
            <div>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={({ date, view }) => {
                  if (view === "month") {
                    const dateKey = date.toDateString();
                    const netAmount = dailyNetAmounts[dateKey];
                    const dayTransactions = transactionsByDate[dateKey];

                    if (dayTransactions && dayTransactions.length > 0) {
                      return (
                        <div
                          style={{
                            fontSize: "6px",
                            textAlign: "center",
                            marginTop: "1px",
                            color: netAmount >= 0 ? "#27ae60" : "#e74c3c",
                          }}
                        >
                          ${Math.abs(netAmount).toFixed(0)}
                          <span style={{ fontSize: "6px" }}>
                            ({dayTransactions.length} tx)
                          </span>
                        </div>
                      );
                    }
                  }
                  return null;
                }}
                tileClassName={({ date, view }) => {
                  if (view === "month") {
                    const dateKey = date.toDateString();
                    if (transactionsByDate[dateKey]) {
                      return "has-transactions";
                    }
                  }
                  return null;
                }}
              />
            </div>
            {selectedDate &&
              transactionsByDate[selectedDate.toDateString()] && (
                <div>
                  <h6>Transactions on {selectedDate.toDateString()}:</h6>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {transactionsByDate[selectedDate.toDateString()].map(
                      (tx, index) => (
                        <li
                          key={index}
                          style={{
                            margin: "1px 0",
                            color: tx.amount >= 0 ? "#27ae60" : "#f7220b",
                            fontSize: "11px",
                            width: "100%",
                          }}
                        >
                          {tx.description} $ {Math.abs(tx.amount).toFixed(2)} (
                          {tx.category})
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default Charts;
