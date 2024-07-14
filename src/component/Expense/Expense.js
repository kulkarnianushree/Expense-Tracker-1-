import React, { useEffect, useState } from 'react';
import './Expenses.css';

const Expense = ({ onEdit }) => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('https://expense-tracker-3fdd0-default-rtdb.firebaseio.com/UserExpense.json');
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      const loadedExpenses = [];
      for (const key in data) {
        loadedExpenses.push({
          id: key,
          ...data[key]
        });
      }
      setExpenses(loadedExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [onEdit]);

  const deleteExpenseHandler = async (expenseId) => {
    try {
      const response = await fetch(`https://expense-tracker-3fdd0-default-rtdb.firebaseio.com/UserExpense/${expenseId}.json`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
      alert('Successfully deleted expense');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{expense.Category}</td>
                  <td>{expense.Description}</td>
                  <td>{expense.Amount}</td>
                </tr>
              </tbody>
            </table>
            <button type="button" onClick={() => onEdit(expense)}>EDIT</button>
            <button type="button" onClick={() => deleteExpenseHandler(expense.id)}>DELETE</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expense;
