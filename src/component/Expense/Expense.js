import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ExpenseAction } from '../../Store/expenseSlice';
import './Expenses.css'

const Expense = ({ onEdit }) => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses.expenses);

  console.log('Expenses:', expenses);

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
      dispatch(ExpenseAction.setExpenses(loadedExpenses));
      console.log('Dispatched setExpenses:', loadedExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [dispatch]);

  const deleteExpenseHandler = async (expenseId) => {
    try {
      const response = await fetch(`https://expense-tracker-3fdd0-default-rtdb.firebaseio.com/UserExpense/${expenseId}.json`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
      dispatch(ExpenseAction.deleteExpense(expenseId));
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
            {expense.Amount > 10000 && <button type='button'>Premium</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expense;