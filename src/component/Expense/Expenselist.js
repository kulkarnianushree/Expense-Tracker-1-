import React, { useState, useEffect } from 'react';

const ExpenseList = ({ onTransfer, selectedExpense }) => {
  const [userExpense, setUserExpense] = useState({
    Category: '',
    Description: '',
    Amount: ''
  });

  useEffect(() => {
    if (selectedExpense) {
      setUserExpense(selectedExpense);
    }
  }, [selectedExpense]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserExpense((prevUserExpense) => ({
      ...prevUserExpense,
      [name]: value
    }));
  };

  const addExpenseHandler = async () => {
    const method = selectedExpense ? 'PATCH' : 'POST';
    const url = selectedExpense
      ? `https://expense-tracker-3fdd0-default-rtdb.firebaseio.com/UserExpense/${selectedExpense.id}.json`
      : 'https://expense-tracker-3fdd0-default-rtdb.firebaseio.com/UserExpense.json';

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(userExpense),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
      const data = await response.json();
      alert('Successfully sent data to backend');
      onTransfer({ id: selectedExpense ? selectedExpense.id : data.name, ...userExpense });
    } catch (error) {
      alert(error.message);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    addExpenseHandler();
    setUserExpense({
      Category: '',
      Description: '',
      Amount: ''
    });
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label>Category</label>
          <select name="Category" onChange={handleChange} value={userExpense.Category}>
            <option value="default">default</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="EMI">EMI</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Rent">Rent</option>
            <option value="Electricity Bill">Electricity Bill</option>
            <option value="Water Bill">Water Bill</option>
            <option value="SBI Card Payment">SBI Card Payment</option>
          </select>
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="Description"
            onChange={handleChange}
            value={userExpense.Description}
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            name="Amount"
            onChange={handleChange}
            value={userExpense.Amount}
          />
        </div>
        <button type="submit">{selectedExpense ? 'Update Expense' : 'Add Expense'}</button>
      </form>
    </div>
  );
};

export default ExpenseList;
