import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import AuthContext from "../../Store/auth-content";
import Welcome from "./Welcome";

const Auth = () => {
  const [isSignin, setIsSignin] = useState(false);
  const [UserDetail, setUserDetail] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();

  const EmailChangeHandler = (event) => {
    setUserDetail((prevUserDetails) => ({
      ...prevUserDetails,
      Email: event.target.value,
    }));
  };

  const PasswordChangeHandler = (event) => {
    setUserDetail((prevUserDetails) => ({
      ...prevUserDetails,
      Password: event.target.value,
    }));
  };

  const ConfirmPasswordChangeHandler = (event) => {
    setUserDetail((prevUserDetails) => ({
      ...prevUserDetails,
      ConfirmPassword: event.target.value,
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
      authctx.login(data.idToken);
      setLoggedIn(true);
      navigate("/Welcome"); // Redirect to the Welcome page
    } catch (error) {
      console.log(error.message);
    }
  };

  const NewUserButtonHandler = () => {
    setIsSignin(true);
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
            <button type="submit">Sign Up</button>
          </form>
          <button className="login-button" onClick={() => setIsSignin(false)}>
            Have an account? Login
          </button>
        </div>
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
            <button type="submit">Login</button>
          </form>
          <button type="button" onClick={NewUserButtonHandler}>
            New User? Sign Up
          </button>
        </div>
      )}
      {loggedIn && <Welcome />}
    </div>
  );
};

export default Auth;
