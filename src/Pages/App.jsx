import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTransactions } from "../Hooks/useTransactions";
import TransactionFormPage from "./TransactionFormPage";
import ChartsPage from "./ChartsPage";
import TransactionListPage from "./TransactionListPage";

const App = () => {
  const { transactions, add, update, remove } = useTransactions();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <TransactionFormPage
              transactions={transactions}
              add={add}
              update={update}
              remove={remove}
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
              update={update}
              remove={remove}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
