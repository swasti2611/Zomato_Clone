// import React from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';

// const Login = () => {

//     const loginWithGoogle = () => {
//         // Redirect to your backend for Google login
//         window.open("https://foodify-restro-backend.onrender.com/auth/google/callback", "_self");
//     };

//     return (
//         <>
            
//                 <div className="container py-5 h-100">
//                     <div className="row d-flex justify-content-center align-items-center h-100">
//                         <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//                             <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
//                                 <div className="card-body p-5 text-center">

//                                     <h3 className="mb-5">Sign in</h3>

//                                     <div className="form-outline mb-4">
//                                         <input type="email" id="typeEmailX-2" className="form-control form-control-lg" />
//                                         <label className="form-label" htmlFor="typeEmailX-2">Email</label>
//                                     </div>

//                                     <div className="form-outline mb-4">
//                                         <input type="password" id="typePasswordX-2" className="form-control form-control-lg" />
//                                         <label className="form-label" htmlFor="typePasswordX-2">Password</label>
//                                     </div>

//                                     <div className="form-check d-flex justify-content-start mb-4">
//                                         <input className="form-check-input" type="checkbox" id="form1Example3" />
//                                         <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
//                                     </div>

//                                     <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>

//                                     <hr className="my-4" />

//                                     <button 
//                                         onClick={loginWithGoogle} 
//                                         className="btn btn-lg btn-block" 
//                                         style={{ backgroundColor: "#dd4b39" }} 
//                                         type="button" // Changed to button type
//                                     >
//                                         <i className="fab fa-google me-2"></i> Sign in with Google
//                                     </button>
                                    
                                   

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
           
//         </>
//     );
// }

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    setIsLoading(true); // Start loading state

    try {
      const response = await fetch('https://foodify-restro-backend.onrender.com/logIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage/sessionStorage or manage it via context
        localStorage.setItem("authToken", data.token); // Store token

        // Redirect to home page or dashboard
        navigate('/'); // Redirect to the home page (or wherever you want)
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  const loginWithGoogle = () => {
    window.open("https://foodify-restro-backend.onrender.com/auth/google/callback", "_self");
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5 text-center">
              <h3 className="mb-5">Sign in</h3>

              {/* Error Message */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                </div>

                <div className="form-check d-flex justify-content-start mb-4">
                  <input className="form-check-input" type="checkbox" id="form1Example3" />
                  <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                </div>

                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                  disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <hr className="my-4" />

              {/* Google Login Button */}
              <button
                onClick={loginWithGoogle}
                className="btn btn-lg btn-block"
                style={{ backgroundColor: "#dd4b39" }}
                type="button"
              >
                <i className="fab fa-google me-2"></i> Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


