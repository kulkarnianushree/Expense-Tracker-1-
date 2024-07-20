import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AuthAction } from "../../Store/auth";
import "./Navigation.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const loginstatus = useSelector(state => state.auth.isLoggedin);

  const handleLogout = () => {
    dispatch(AuthAction.logout());
    navigation('/');
  };

  return (
    <nav>
      <ul className="nav-links">
        {!loginstatus && (
          <li>
            <NavLink to='/ForgotPassword'></NavLink>
          </li>
        )}
        {loginstatus && (
          <>
            <li>
              <NavLink to="/welcome"></NavLink>
            </li>
            <li>
              <NavLink to='/Profile'></NavLink>
            </li>
            <li>
              <NavLink to='/download'></NavLink>
            </li>
          </>
        )}

      </ul>
      {loginstatus && (
        <button className="logout-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navigation;
