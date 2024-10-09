import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import '../Style/header.css';
import axios from 'axios';

Modal.setAppElement('#root'); // Set the app element for accessibility

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userdata, setUserdata] = useState({});

  const handleLoginOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginModalOpen(false);
  };

  const loginWithGoogle = () => {
    
    window.open("https://foodify-restro-backend.onrender.com/auth/google/callback");
  };
  

  const getUser = async () => {
    try {
      const response = await axios.get("https://foodify-restro-backend.onrender.com/login/sucess", { withCredentials: true });
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
               
            <div className=" px-2 py-2" ><img src={userdata.image}  
             className='user-logo'/></div>
         
                <div className="login" onClick={handleLogout}>Logout</div>
                <Link className="home" to="/" onClick={handleLoginOpen}>Home</Link>
              </>
            ) : (
              <>
              <div className="login" onClick={handleLoginOpen}>Login</div>
              <div className="col-8 col-md-4 col-lg-3 text-start">
            <div className="createacc px-2 py-2" to="/">create an account</div>
          </div>
          </>
            )}
          </div>
          
        </div>
      </div>

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={handleLoginClose}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: "400px",
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            border: 'solid 2px #fff',
            boxShadow: "0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)"
          }
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title">Sign in</h5>
          <button type="button" className="btn-close" onClick={handleLoginClose}></button>
        </div>
        <div className="modal-body p-4">
          <form>
            <div className="form-outline mb-4">
              <input type="email" id="email1" className="form-control" />
              <label className="form-label" htmlFor="email1">Email address</label>
            </div>
            <div className="form-outline mb-4">
              <input type="password" id="password1" className="form-control" />
              <label className="form-label" htmlFor="password1">Password</label>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
          <button className='login-with-google-btn' onClick={loginWithGoogle}>
            Sign In With Google
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
