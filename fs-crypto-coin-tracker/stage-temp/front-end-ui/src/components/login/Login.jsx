
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('form submitted')

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        console.log(`form submit - username: ${username} password: ${password}`)
    }
    return <div className="login-form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username" 
                        type="text"
                        ref={usernameRef}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        ref={passwordRef}
                        required
                        >
                    </input>
                </div>
                <div className='form-group-control'>
                    <button className='button-form'>Login</button>
                </div>
                <div className='form-group-control'>
                    <Link to="/register">Register New Account</Link>
                </div>
            </form>
        </div>
}

export default Login;