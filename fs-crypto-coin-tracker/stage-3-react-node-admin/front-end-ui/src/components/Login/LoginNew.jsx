import React, { useState } from 'react';
import Register from './RegisterNew';

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
        <div className="d-flex justify-content-center align-items-center mt-5 ml-5">
            <div className="card p-4 shadow" style={{ minWidth: 350 }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-2">
                        Login
                    </button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => setShowRegister(true)}
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;