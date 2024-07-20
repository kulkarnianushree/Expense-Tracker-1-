import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AuthAction } from "../../Store/auth";
import "./Auth.css";
import Welcome from "./Welcome";
import ForgotPassword from "./Forgot-Password";

const Auth = () => {
  const loginStatus = useSelector(state => state.auth.isLoggedin);
  const dispatch = useDispatch();
  const [isSignin, setIsSignin] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [UserDetail, setUserDetail] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const navigate = useNavigate();

  const EmailChangeHandler = (event) => {
    setUserDetail(prevUserDetails => ({
      ...prevUserDetails,
      Email: event.target.value,
    }));
  };

  const PasswordChangeHandler = (event) => {
    setUserDetail(prevUserDetails => ({
      ...prevUserDetails,
      Password: event.target.value,
    }));
  };

  const ConfirmPasswordChangeHandler = (event) => {
    setUserDetail(prevUserDetails => ({
      ...prevUserDetails,
      ConfirmPassword: event.target.value,
    }));
  };

  const SigninButtonHandler = async (event) => {
    event.preventDefault();

    if (UserDetail.Email.trim().length > 0 &&
        UserDetail.Password.trim().length > 6 &&
        UserDetail.ConfirmPassword.trim().length > 6 &&
        UserDetail.Password === UserDetail.ConfirmPassword) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDlybY9oSYa0NreurM1v2BQ1v9Monw07A",
          {
            method: "POST",
            body: JSON.stringify({
              email: UserDetail.Email,
              password: UserDetail.Password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
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

  const LogInButtonHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDlybY9oSYa0NreurM1v2BQ1v9Monw07A",
        {
          method: "POST",
          body: JSON.stringify({
            email: UserDetail.Email,
            password: UserDetail.Password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Authentication Failed");
      }
      const data = await response.json();
      dispatch(AuthAction.login(data.idToken));
      if (loginStatus) {
        navigate("/Welcome");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const NewUserButtonHandler = () => {
    setIsSignin(true);
  };

  const ForgotPasswordHandler = () => {
    setForgotPassword(true);
  };

  return (
    <div className="auth-container">
      {isSignin ? (
        <div className="signup-container">
          <h1>Sign Up</h1>
          <form onSubmit={SigninButtonHandler}>
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
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          <button className="login-button" onClick={() => setIsSignin(false)}>
            Have an account? Login
          </button>
        </div>
      ) : forgotPassword ? (
        <ForgotPassword setForgotPassword={setForgotPassword} />
      ) : (
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={LogInButtonHandler}>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                onChange={EmailChangeHandler}
                value={UserDetail.Email}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={PasswordChangeHandler}
                value={UserDetail.Password}
                required
              />
            </div>
            <button type="button" className="forgot-password-button" onClick={ForgotPasswordHandler}>Forgot Password</button>
            <button type="submit" className="login-button">Login</button>
          </form>
          <button type="button" className="signup-button" onClick={NewUserButtonHandler}>
            New User? Sign Up
          </button>
        </div>
      )}
      {loginStatus && <Welcome />}
    </div>
  );
};

export default Auth;
