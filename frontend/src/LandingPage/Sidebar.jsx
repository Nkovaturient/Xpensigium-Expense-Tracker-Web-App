import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faHistory,
  faHome,
  faSignOut,
  faUserCheck,
  faUserShield,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { StoreContext } from "../Context/StoreContext";

const Sidebar = () => {
  const { token, navigate, userData, handleLogout, userEmail } = useContext(StoreContext);

  const {email}=userData;

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-user-handle">
        <Link to="/">
          <img src="user.webp" alt="user-img" className="user" />
        </Link>
        <button onClick={() => navigate("/dashboard")}>
          { email || userEmail
          ? email || userEmail
          :  'Dashboard'  } &nbsp;
          <FontAwesomeIcon icon={faUserCheck} />
        </button>
      </div>

      <div className="sidebar-options">
        <NavLink to="/" className="sidebar-option">
          <span>
            <FontAwesomeIcon icon={faHome} />
          </span>
          <p>Home</p>
        </NavLink>
        <NavLink to={"/addexpense"} className="sidebar-option">
          <span>
            <FontAwesomeIcon icon={faWallet} />
          </span>
          <p>Add Expense</p>
        </NavLink>
        <NavLink to={"/expenses"} className="sidebar-option">
          <span>
            <FontAwesomeIcon icon={faCalculator} />
          </span>
          <p>Visualize Expenses</p>
        </NavLink>

        <NavLink to="/records" className="sidebar-option">
          <span>
            <FontAwesomeIcon icon={faHistory} />
          </span>
          <p>Records</p>
        </NavLink>
        {token ? (
          <button onClick={handleLogout} className="sidebar-option">
            <span>
              <FontAwesomeIcon icon={faSignOut} />
            </span>
            <p>LogOut</p>
          </button>
        ) : (
          <NavLink to={"/signup"} className="sidebar-option">
            <span>
              <FontAwesomeIcon icon={faUserShield} />
            </span>
            <p>Sign Up</p>
          </NavLink>
        )}
      </div>

      <div className="sidebar-footer">
        <Link to="/">
          <img src="logo2.jpg" alt="hero-img" className="logo mt-10"  style={{width: '320px'}}/>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
