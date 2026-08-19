import React, { useState } from 'react';

const Register = ({ onBack }) => {
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        alert(`Registered as ${form.username}`);
        if (onBack) onBack();
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5 ml-5">
            <div className="card p-4 shadow" style={{ minWidth: 350 }}>
                <h2 className="text-center mb-4">Register</h2>
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
                    <button type="submit" className="btn btn-success w-100 mb-2">
                        Register
                    </button>
                </form>
                <button
                    type="button"
                    className="btn btn-link w-100"
                    onClick={onBack}
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default Register;