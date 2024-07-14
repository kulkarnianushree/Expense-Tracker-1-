import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("Token");
  const [token, setToken] = useState(initialToken);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("Token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("Token");
  };

  const contextValue = {
    token: token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
