"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
    const [state, setState] = useState({course: "", id: ""})

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/admindashboard">Admin Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/userdashboard">User Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/auth/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/auth/register">Register</Link>
                        </li>
                        <li className="nav-item" style={{display: "flex"}}>
                            <Link className="nav-link" href={`/courses/${state.course}/lessons/${state.id}`}>Lesson</Link>
                            <input type="text" name='id' onChange={handleChange} />
                        </li>
                    </ul>
                </div>
            </div>
</nav>
    );
}

export default Navbar;
