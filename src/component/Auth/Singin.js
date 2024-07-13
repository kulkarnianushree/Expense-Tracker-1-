// Signin.js
import React, { useState } from "react";
import './Signin.css';
import Login from "./Login";

const Signin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [UserDetail, setUserDetail] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: ""
  });

  const EmailChangeHandler = (event) => {
    setUserDetail((PrevUserDetails) => ({
      ...PrevUserDetails,
      Email: event.target.value
    }));
  };

  const PasswordChangeHandler = (event) => {
    setUserDetail((PrevUserDetails) => ({
      ...PrevUserDetails,
      Password: event.target.value
    }));
  };

  const ConfirmPasswordChangeHandler = (event) => {
    setUserDetail((PrevUserDetails) => ({
      ...PrevUserDetails,
      ConfirmPassword: event.target.value
    }));
  };

  const SigninButtonHandler = async (event) => {
    event.preventDefault();

    if (
      UserDetail.Email.trim().length > 0 &&
      UserDetail.Password.trim().length > 6 &&
      UserDetail.ConfirmPassword.trim().length > 6 &&
      UserDetail.Password === UserDetail.ConfirmPassword
    ) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDlybY9oSYa0NreurM1v2BQ1v9Monw07A",
          {
            method: "POST",
            body: JSON.stringify({
              email: UserDetail.Email,
              password: UserDetail.Password,
              returnSecureToken: true
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message);
        }

        const data = await response.json();
        console.log("User created successfully", data);
        alert("User created successfully");
      } catch (error) {
        alert("Authentication Failed: " + error.message);
      }
    } else if (UserDetail.Password !== UserDetail.ConfirmPassword) {
      alert("Password and Confirm Password should be the same");
    } else {
      alert("Password must be at least 8 characters long");
    }
  };

  const LoginButtonHandler = () => {
    setIsLogin(true);
  };

  const FormSubmitHandler = (event) => {
    event.preventDefault();
    setUserDetail({
      Email: '',
      Password: '',
      ConfirmPassword: ''
    });
  };

  return (
    <div className="signup-container">
      {isLogin ? (
        <Login />
      ) : (
        <>
          <h1>Sign Up</h1>
          <form onSubmit={FormSubmitHandler}>
            <div>
              <input
                type="email"
                placeholder="Email"
                onChange={EmailChangeHandler}
                value={UserDetail.Email}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={PasswordChangeHandler}
                value={UserDetail.Password}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={ConfirmPasswordChangeHandler}
                value={UserDetail.ConfirmPassword}
                required
              />
            </div>
            <button type="submit" onClick={SigninButtonHandler}>
              Sign Up
            </button>
          </form>
          <button className="login-button" onClick={LoginButtonHandler}>
            Have an account? Login
          </button>
        </>
      )}
    </div>
  );
};

export default Signin;
