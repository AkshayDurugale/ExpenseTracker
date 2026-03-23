import React from "react";
import TransactionList from "../Component/TransactionList";
import Header from "../Component/Header";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import styles from "../Styles/TransactionList.module.css";

const TransactionListPage = ({ transactions, update, remove }) => {
  const exportToExcel = () => {
    if (!transactions.length) return;
    const data = transactions.map((t) => ({
      Date: t.date,
      Description: t.description,
      Category: t.category,
      Amount: t.amount,
      Type: t.amount < 0 ? "Expense" : "Income",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  const exportToPDF = () => {
    if (!transactions.length) return;
    const doc = new jsPDF();

    const margin = 10;
    let yPosition = 20;

    // Title
    doc.setFontSize(16);
    doc.text("Transactions Report", margin, yPosition);
    yPosition += 15;

    // Table headers
    doc.setFontSize(10);
    doc.text("Date", margin, yPosition);
    doc.text("Description", margin + 30, yPosition);
    doc.text("Category", margin + 90, yPosition);
    doc.text("Amount", margin + 120, yPosition);
    doc.text("Type", margin + 150, yPosition);
    yPosition += 10;

    // Draw header line
    doc.line(margin, yPosition, 200, yPosition);
    yPosition += 5;

    // Table data
    transactions.forEach((t) => {
      if (yPosition > 270) {
        // New page if needed
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(8);
      doc.text(t.date, margin, yPosition);
      doc.text(t.description.substring(0, 20), margin + 30, yPosition); // Truncate long descriptions
      doc.text(t.category, margin + 90, yPosition);
      doc.text(t.amount.toString(), margin + 120, yPosition);
      doc.text(t.amount < 0 ? "Expense" : "Income", margin + 150, yPosition);
      yPosition += 8;
    });

    doc.save("transactions.pdf");
  };

  return (
    <div className="App">
      <Header />
      <div className={styles.toolbar}>
        <button
          className="primary"
          onClick={exportToExcel}
          disabled={!transactions.length}
        >
          Export to Excel
        </button>
        <button
          className="secondary"
          onClick={exportToPDF}
          disabled={!transactions.length}
        >
          Export to PDF
        </button>
      </div>

      <main className="main">
        <section className="section">
          <h2>All Transactions</h2>
          <TransactionList
            transactions={transactions}
            removeTransaction={remove}
          />
        </section>
      </main>
    </div>
  );
};

export default TransactionListPage;
