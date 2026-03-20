import "../App.css";
import { useState } from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Header from "../Component/Header";
import TransactionForm from "../Component/TransactionForm";
import TransactionList from "../Component/TransactionList";
import Dashboard from "../Component/Dashboard";
import Charts from "../Component/Chart";
import { useTransactions } from "../Hooks/useTransactions";

const App = () => {
  const { transactions, add, update, remove } = useTransactions();
  const [editing, setEditing] = useState(null);

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
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    let yPosition = 20;

    // Title
    doc.setFontSize(16);
    doc.text("Transactions Report", margin, yPosition);
    yPosition += 15;

    // Table headers
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    const headers = ["Date", "Description", "Category", "Amount", "Type"];
    const colWidths = [30, 40, 30, 25, 25];
    let xPosition = margin;

    headers.forEach((header, index) => {
      doc.text(header, xPosition, yPosition);
      xPosition += colWidths[index];
    });

    yPosition += 8;
    doc.setLineWidth(0.3);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // Table rows
    doc.setFont(undefined, "normal");
    transactions.forEach((t) => {
      if (yPosition > pageHeight - 15) {
        doc.addPage();
        yPosition = 20;
      }

      xPosition = margin;
      const row = [
        t.date,
        t.description,
        t.category,
        t.amount.toString(),
        t.amount < 0 ? "Expense" : "Income",
      ];
      row.forEach((cell, index) => {
        doc.text(cell, xPosition, yPosition);
        xPosition += colWidths[index];
      });
      yPosition += 7;
    });

    doc.save("transactions.pdf");
  };

  return (
    <div className="app">
      <Header />
      <div
        className="export-actions"
        style={{ padding: "0 20px", margin: "16px 0" }}
      >
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
          style={{ marginLeft: "10px" }}
        >
          Export to PDF
        </button>
      </div>
      <main className="main">
        <section className="section">
          <TransactionForm
            addTransaction={add}
            updateTransaction={update}
            editing={editing}
            setEditing={setEditing}
          />
          <Dashboard transactions={transactions} />
        </section>

        <section className="section">
          <Charts transactions={transactions} />
          <TransactionList
            transactions={transactions}
            removeTransaction={remove}
            setEditing={setEditing}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
