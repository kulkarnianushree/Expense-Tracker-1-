import React from "react";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
    const navigate = useNavigate()
   const ProfileCompleteHandler = () =>{
    navigate('/Profile')
   } 
   return (
    <div>
      <h3>Welcome To Expense Tracker</h3>
      <p>
        Your Profile is Incomplete
        <button onClick={ProfileCompleteHandler}>Complete now</button>
      </p>
    </div>
  );
};

export default Welcome;
