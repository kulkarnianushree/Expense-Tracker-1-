import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Welcome = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const ProfileCompleteHandler = () => {
    navigate("/Profile");
  };

  const verifyemailhandler = async () => {
    try {
      if (!token) {
        throw new Error("Token not available. Please log in again.");
      }

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=YOUR_API_KEY",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Email verification request failed.");
      }

      const data = await response.json();
      console.log(data);
      alert("Verification email sent successfully.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <h3 className="title">Welcome To Expense Tracker</h3>
      <p className="message">
        Your Profile is Incomplete. Complete it now.
      </p>
      <div className="buttons">
        <button onClick={ProfileCompleteHandler}>Complete now</button>
        <button type="submit" onClick={verifyemailhandler}>
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default Welcome;