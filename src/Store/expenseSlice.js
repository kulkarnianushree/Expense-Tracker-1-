import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  expenses: [],
  theme: 'gray'
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    },
    toggle(state) {
      state.theme = state.theme === 'gray' ? 'white' : 'gray';
    },
    DownloadFile(state){
        
    }
  },
});

export const ExpenseAction = expensesSlice.actions;
export default expensesSlice.reducer;
