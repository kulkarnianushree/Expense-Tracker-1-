import React,{useState} from "react";
import Welcome from "../component/Auth/Welcome";
import ExpenseList from "../component/Expense/Expenselist";
import Expense from "../component/Expense/Expense";
const WelcomePage = () => {
  const[ExpenseData,setExpenseData]=useState([])
  const UserExpenseDataHandler = (userData)=>{
    const newUserData = {id:Math.random(),...userData}
    setExpenseData((PrevExpenseData)=>([
      ...PrevExpenseData,
      newUserData
    ]))
  }
  return(
    <div>
      <Welcome/>
      <ExpenseList onTransfer={UserExpenseDataHandler}/>
      <Expense expenses={ExpenseData}/>
    </div>
  )
};

export default WelcomePage;
