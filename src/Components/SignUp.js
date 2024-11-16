import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!name || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // API call to sign up the user
    try {
      const response = await fetch('https://foodify-restro-backend.onrender.com/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lastName, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError('');
        // Optionally, redirect to the login page after successful sign-up
        // navigate('/login');
      } else {
        setError(data.error || "Signup failed. Please try again.");
        setSuccess('');
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      setSuccess('');
    }
  };

  return (
    <>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Sign Up</h3>

                {/* Success Message */}
                {success && <div className="alert alert-success">{success}</div>}

                {/* Error Message */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* SignUp Form */}
                <form onSubmit={handleSignUpSubmit}>
                  <div className="form-outline mb-4">
                    <input 
                      type="text" 
                      id="typeName" 
                      className="form-control form-control-lg" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                    <label className="form-label" htmlFor="typeName">First Name</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input 
                      type="text" 
                      id="typeLastName" 
                      className="form-control form-control-lg" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                    />
                    <label className="form-label" htmlFor="typeLastName">Last Name</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input 
                      type="email" 
                      id="typeEmail" 
                      className="form-control form-control-lg" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label className="form-label" htmlFor="typeEmail">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input 
                      type="password" 
                      id="typePassword" 
                      className="form-control form-control-lg" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                    <label className="form-label" htmlFor="typePassword">Password</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input 
                      type="password" 
                      id="typeConfirmPassword" 
                      className="form-control form-control-lg" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    <label className="form-label" htmlFor="typeConfirmPassword">Confirm Password</label>
                  </div>

                  <button className="btn btn-primary btn-lg btn-block" type="submit">Sign Up</button>
                </form>

                <hr className="my-4" />

                {/* Google Signup Button */}
                <button 
                  onClick={() => window.open("https://foodify-restro-backend.onrender.com/auth/google/callback", "_self")}
                  className="btn btn-lg btn-block" 
                  style={{ backgroundColor: "#dd4b39" }} 
                  type="button"
                >
                  <i className="fab fa-google me-2"></i> Sign up with Google
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
