import React, { useContext } from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOut,
  faUserCheck,
  faUserShield,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { StoreContext } from '../../Context/StoreContext';

const Dashboard = () => {
  const {userData, photoUrl, token, handleLogout, userEmail}=useContext(StoreContext);

  const {email}=userData;


  return (
    <>
    <div className="dashboard-container">
      <h1 className='text-3xl'>Dashboard</h1>
    {token ? (
      <div className="dashboard-item mt-4 flex flex-col gap-24 justify-content text-center" style={{margin: '0 auto'}}>
      <div className="sidebar-user-handle mt-40">
        <Link to="/">
          <img src={ `user.webp`} alt="user-img" className="user" />
        </Link>
        <p className=' text-2xl'>
        { email 
          ? email 
          : userEmail 
          ? userEmail 
          :  'Dashboard'  } &nbsp;
        </p>
        <button onClick={handleLogout} className="sidebar-option mx-96 w-80 text-center">
            <span >
              <FontAwesomeIcon icon={faSignOut} />
            </span>
            <b>LogOut</b>
          </button>
      </div>
      
          
          </div>
        ) : (
          <NavLink to={"/signup"} className="sidebar-option w-64 mt-4">
            <span>
              <FontAwesomeIcon icon={faUserShield} />
            </span>
            <b>Sign Up</b>
          </NavLink>
        )}
    </div>
    </>
  )
}

export default Dashboard