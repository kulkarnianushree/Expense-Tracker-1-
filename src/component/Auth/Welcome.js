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
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDDlybY9oSYa0NreurM1v2BQ1v9Monw07A",
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
    <div>
      <h3>Welcome To Expense Tracker</h3>
      <p>
        Your Profile is Incomplete
        <button onClick={ProfileCompleteHandler}>Complete now</button>
      </p>
      <button type="submit" onClick={verifyemailhandler}>
        Verify Email
      </button>
    </div>
  );
};

export default Welcome;
