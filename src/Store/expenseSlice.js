import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(expense => expense.id!== action.payload);
    },
  },
});

export const ExpenseAction = expensesSlice.actions;
export default expensesSlice.reducer;