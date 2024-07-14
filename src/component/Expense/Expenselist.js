import React,{useState} from 'react';

const ExpenseList = (props) =>{
    const[userExpense,setUserExpense]=useState({
        Category:'',
        Description:'',
        Amount:''
    })
    const CategoryChangeHandler = (event)=>{
        setUserExpense((PrevUserExpense)=>({
            ...PrevUserExpense,
            Category:event.target.value
        }))
    }
    const DescriptionChangeHandler =(event)=>{
        setUserExpense((PrevUserExpense)=>({
            ...PrevUserExpense,
            Description:event.target.value
        }))
    }
    const AmountChangeHandler = (event)=>{
        setUserExpense((PrevUserExpense)=>({
            ...PrevUserExpense,
            Amount:event.target.value
        }))
    }
    const FormSubmitHandler = (event) =>{
        event.preventDefault();
        props.onTransfer(userExpense)
        setUserExpense({
            Category:'',
            Description:'',
            Amount:''
        })
    }
    return(
        <div>
            <form onSubmit={FormSubmitHandler}>
                <div>
                    <label>Category</label>
                    <select onChange={CategoryChangeHandler} value={userExpense.Category}>
                        <option>default</option>
                        <option>Food</option>
                        <option>Shopping</option>
                        <option>EMI</option>
                        <option>Entertainment</option>
                        <option>Rent</option>
                        <option>Electricity Bill</option>
                        <option>Water Bill</option>
                        <option>SBI Card Payment</option>
                    </select>
                </div>
                <div>
                    <label>Description</label>
                    <input 
                        type='text'
                        onChange={DescriptionChangeHandler}
                        value={userExpense.Description}
                    />
                </div>
                <div>
                    <label>Amount</label>
                    <input 
                        type='number'
                        onChange={AmountChangeHandler}
                        value={userExpense.Amount}
                    />
                </div>
                <button type='submit'>Add Expense</button>
            </form>
        </div>
    )
}
export default ExpenseList