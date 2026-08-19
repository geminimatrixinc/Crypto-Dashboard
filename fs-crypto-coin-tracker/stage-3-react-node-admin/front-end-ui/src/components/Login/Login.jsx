import React, { useState } from 'react';
import Register from './Register';

const Login = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        alert(`Logging in as ${form.username}`);
    };

    if (showRegister) {
        return <Register onBack={() => setShowRegister(false)} />;
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account?{' '}
                <button type="button" onClick={() => setShowRegister(true)}>
                    Register
                </button>
            </p>
        </div>
    );
};

export default Login;