import React, { useRef } from 'react';

const Register = () => {

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('form submitted')

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;

        console.log(`form submit - username: ${username} password: ${password}`)
    }

    return <div className="login-form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    ref={firstNameRef}
                    required>
                </input>
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    ref={lastNameRef}
                    required>
                </input>
            </div>
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
                <button className='button-form'>Submit</button>
            </div>
        </form>
    </div>

}

export default Register;