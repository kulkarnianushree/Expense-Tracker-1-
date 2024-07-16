import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './auth';
import expensesReducer from './expenseSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    expenses: expensesReducer,
  },
});

export default store;