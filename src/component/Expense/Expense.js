import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ExpenseAction } from '../../Store/expenseSlice';
import './Expense.css'; // Import the CSS file

const Expense = ({ onEdit }) => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses.expenses);
  const navigate = useNavigate();

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

  const PremiumHandler = () => {
    navigate('/download');
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
            <div className="expense-buttons">
              <button className="edit-button" type="button" onClick={() => onEdit(expense)}>EDIT</button>
              <button className="delete-button" type="button" onClick={() => deleteExpenseHandler(expense.id)}>DELETE</button>
              {expense.Amount > 10000 && <button className="premium-button" type="button" onClick={PremiumHandler}>Premium</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expense;
