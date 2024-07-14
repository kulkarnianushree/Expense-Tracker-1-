import React, { useState } from "react";
import Welcome from "../component/Auth/Welcome";
import ExpenseList from "../component/Expense/Expenselist";
import Expense from "../component/Expense/Expense";

const WelcomePage = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const userExpenseDataHandler = (userData) => {
    const newUserData = { id: Math.random(), ...userData };
    setExpenseData((prevExpenseData) => [
      ...prevExpenseData,
      newUserData
    ]);
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
  };

  return (
    <div>
      <Welcome />
      <ExpenseList onTransfer={userExpenseDataHandler} selectedExpense={selectedExpense} />
      <Expense expenses={expenseData} onEdit={handleEditExpense} />
    </div>
  );
};

export default WelcomePage;
