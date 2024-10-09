import React from 'react'

import Modal from 'react-modal'
const Login = () => {

   
  return (
    <>
        <div className="login-page">
            <h1 style={{textAlign:"center"}}>Login</h1>
            <div className="login-form">
                <form >
                    <input type="text" name="username" id="username" placeholder='username' />
                    <input type="password" name="password" id="password" placeholder='password'  />
                    <button>Login</button>
                    <p className='message'>Not Registerd? <a href="#">Create an account</a></p>
                </form>
                <button className='login-with-google-btn' >
                    Sign In With Google
                </button>
            </div>
        </div>
    </>
  )
}

export default Login