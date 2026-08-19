import React, { useRef, useState, useEffect } from 'react';

function UserInputWithRef() {
  
    // state hooks
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    // ref hooks for input values
    const nameRef = useRef(null);
    const emailRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = nameRef.current.value;
        const email =emailRef.current.value;

        alert(`Name: ${name}\nEmail: ${email}`);

        // update state. use hooks
        setName(name);
        setEmail(email);
    };


    return (
        <div className="App">
            <h1>React Input Events and Forms</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        ref={nameRef}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        ref={emailRef}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>

            <p>Name: {name}</p>
            <p>Email: {email}</p>
        </div>
    );

}

export default UserInputWithRef;
