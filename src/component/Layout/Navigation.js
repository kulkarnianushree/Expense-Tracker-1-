
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { AuthAction } from "../../Store/auth";
import "./Navigation.css";
const Navigation = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const loginstatus = useSelector(state => state.auth.isLoggedin)
  const handleLogout = () => {
    dispatch(AuthAction.logout())
    navigation('/')
  };

  return (
    <nav>
      {!loginstatus && (
        <li>
          <NavLink to='/ForgotPassword'/>
        </li>
      )}
      {loginstatus && (
        <ul>
          <li>
            <NavLink to="/welcome"/>
          </li>
          <li>
            <NavLink to='/Profile'/>
          </li>
        </ul>
      )}
      {loginstatus && (
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navigation;
