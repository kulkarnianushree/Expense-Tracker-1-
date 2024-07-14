import React, { useEffect, useState } from 'react';
import './Expenses.css';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
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

    fetchExpenses();
  }, []);

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expense;
