import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigate();

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
        throw new Error('Failed to send link. Please try again.');
      }

      const data = await response.json();
      console.log(data);
      alert('Successfully Sent Link to Registered E-mail');
    } catch (error) {
      alert(error.message);
    }
  };

  const GoBackHandler = () => {
    navigation('/');
  };

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label htmlFor="email">Enter Registered E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
          />
        </div>
        <button type="button" onClick={SendLinkHandler}>Send Link</button>
        <button type="button" onClick={GoBackHandler}>Go Back</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
