import React from 'react';
import './download.css';
import { useDispatch, useSelector } from 'react-redux';
import { ExpenseAction } from '../../Store/expenseSlice';

const Download = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.expenses.theme);
  const expenses = useSelector(state => state.expenses.expenses);

  const toggleColour = () => {
    dispatch(ExpenseAction.toggle());
  };

  const downloadHandler = () => {
    const csvRows = [
      ['Category', 'Description', 'Amount'], // Headers
      ...expenses.map(expense => [expense.Category, expense.Description, expense.Amount])
    ];
    
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'expenses.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="main" style={{ backgroundColor: theme }}>
      <h1 className="heading">Premium Features</h1>
      <p className="description">Download our premium features now!</p>
      <button className="download-button" onClick={toggleColour}>Toggle</button>
      <button type='button' onClick={downloadHandler}>Download as CSV</button>
    </div>
  );
};

export default Download;
