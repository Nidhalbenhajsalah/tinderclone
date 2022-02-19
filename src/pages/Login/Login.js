import React from 'react'
import './Login.css'

const Login = () => {
    return (
        <div className='login'>
            <h1 className='loginTitle'>Choose a Login Method</h1>
            <div className='wrapper'>
                <div className='left'>
                    <div className='loginButton google'>
                        <i className="fa-brands fa-google icon"></i>
                        Google
                    </div>
                    <div className='loginButton facebook'>
                        <i className="fa-brands fa-facebook icon"></i>
                        Facebook
                    </div>
                </div>
                <div className='center'>
                    <div className='line' />
                    <div className='or'>OR</div>
                </div>
                <div className='right'>
                    <input type='text' placeholder='Username' />
                    <input type='password' placeholder='Password' />
                    <button className='submit'>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login
