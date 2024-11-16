import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Style/header.css';
import axios from 'axios';

const Header = () => {
  const [userdata, setUserdata] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get("https://foodify-restro-backend.onrender.com/login/success", { withCredentials: true });
      setUserdata(response.data.user);
      console.log(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    window.open("https://foodify-restro-backend.onrender.com/logout", "_self");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="header">
        <div className="row text-end pt-4 login-signup-row">
          <div className="col-2 col-md-6 col-lg-7"></div>
          <div className="col-2 col-lg-2 pe-4 text-end">
            {Object.keys(userdata).length > 0 ? (
              <>
                <div className="name">{userdata.displayName}</div>
                <div className=" px-2 py-2">
                  <img src={userdata.image} className='user-logo' alt="user-logo" />
                </div>
                <div className="login" onClick={handleLogout}>Logout</div>
                <Link className="home" to="/">Home</Link>
              </>
            ) : (
              <>
                <div className="login">
                  <Link to="/login">Login</Link>
                </div>
                <Link className="home" to="/">Home</Link>
                <div className="col-8 col-md-4 col-lg-3 text-start">
                  <Link to="/signup" className="createacc px-2 py-2">
                    Create an account
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
