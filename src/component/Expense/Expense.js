import React from 'react';
import './Expenses.css';

const Expense = (props) => {
  return (
    <div>
      <ul className="expense-list">
        {props.expenses.map((expense) => {
          return (
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
          );
        })}
      </ul>
    </div>
  );
};

export default Expense;
