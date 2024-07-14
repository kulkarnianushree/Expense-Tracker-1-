// Navigation.js
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-content";
import "./Navigation.css";

const Navigation = () => {
  const authctx = useContext(AuthContext);
  const navigate = useNavigate()
  const handleLogout = () => {
    authctx.logout(); 
    navigate('/')
  };

  return (
    <nav>
        {!authctx.isLoggedIn && (<li>
            <NavLink to='/ForgotPassword'/>
        </li>)}
      <ul>
       
        {authctx.isLoggedIn && (
            <ul>
                <li>
                    <NavLink to="/welcome"/>
                </li>
                <li>
                    <NavLink to='/Profile'/>
                </li>
            </ul>
        
        )}
      </ul>
      {authctx.isLoggedIn && (
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navigation;
