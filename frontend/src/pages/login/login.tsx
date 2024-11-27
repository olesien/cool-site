import React, { useState } from 'react';
import './login.css';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {

    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const navigate = useNavigate()

    
    const loggingIn = () =>{
        if(username === 'admin' && password ==='admin'){
            navigate('/')
            alert('You are now logged in as Admin')
        } else {
            alert('Your username and password are incorrect')
        }
    }

    return (
        <>
            <link
                href="https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css"
                rel="stylesheet"
            />
            <div className="signin-box">
                <h1 className="signin-title">Sign in</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <i className="bx bxs-user-circle"></i>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <i className="bx bxs-lock"></i>
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="#" className="forgot-password">
                        Forgot Password?
                    </a>
                </div>
                <button type="submit" className="btn"
                onClick={loggingIn}>Sign in</button>
                <div className="register-link">
                    <p>
                        Don't have an account? <a href="#">Click here</a>
                    </p>
                </div>
            </div>
        </>
    );
}
