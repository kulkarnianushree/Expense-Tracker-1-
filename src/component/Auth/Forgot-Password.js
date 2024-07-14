import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const SendLinkHandler = async () => {
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDDlybY9oSYa0NreurM1v2BQ1v9Monw07A', {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email: email
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Try again');
      }

      const data = await response.json();
      console.log(data);
      alert('Successfully Sent Link to Registered E-mail');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <form>
        <div>
          <label>Enter Registered E-mail</label>
          <input 
            type="email" 
            value={email} 
            onChange={emailChangeHandler} 
          />
        </div>
        <button type="button" onClick={SendLinkHandler}>Send Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
