import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-content";
const Welcome = () => {
    const AuthCtx = useContext(AuthContext)
    const navigate = useNavigate()
   const ProfileCompleteHandler = () =>{
    navigate('/Profile');
   } 
   const verifyemailhandler = async () =>{
        try{
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDDlybY9oSYa0NreurM1v2BQ1v9Monw07A',{
                method:'POST',
                body: JSON.stringify({
                    requestType:'VERIFY_EMAIL',
                    idToken:AuthCtx.token
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(!response.ok){
                throw new Error('Email is not verified try again')
            }
            const data = await response.json()
            console.log(data)
            alert('sent a mail successfully to your email address')
        }
        catch (error){
          alert(error.message)  
        }
   }
   return (
    <div>
      <h3>Welcome To Expense Tracker</h3>
      <p>
        Your Profile is Incomplete
        <button onClick={ProfileCompleteHandler}>Complete now</button>
      </p>
      <button type="submit" onClick={verifyemailhandler}>Verify Email</button>
    </div>
  );
};

export default Welcome;
