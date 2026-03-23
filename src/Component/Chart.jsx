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
import ChartDataLabels from "chartjs-plugin-datalabels";
import styles from "../Styles/Chart.module.css";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartDataLabels,
);

const Charts = ({ transactions }) => {
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

  const dailyTotals = transactions.reduce((acc, tx) => {
    const day = new Date(tx.date).toLocaleDateString();
    acc[day] = (acc[day] || 0) + tx.amount;
    return acc;
  }, {});
  const lineLabels = Object.keys(dailyTotals);
  const lineData = Object.values(dailyTotals);

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
            <div style={{ height: "300px", width: "100%" }}>
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
            <h3>Daily Balance</h3>
            <div style={{ height: "300px", width: "100%" }}>
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
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                      labels: {
                        font: {
                          size: 12,
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        font: {
                          size: 10,
                        },
                      },
                    },
                    y: {
                      ticks: {
                        font: {
                          size: 10,
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Charts;
