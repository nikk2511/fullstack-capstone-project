import React, { useState } from 'react';
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './RegisterPage.css';

function RegisterPage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [ setShowerr] = useState('');

    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();
    
    const handleRegister = async () => {
        const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName:firstName,
                lastName: lastName,
                email: email, 
                password: password
            }),
        });
        const json = await response.json();
        
        console.log('json data', json);
        console.log('er', json.error);
        
        if(json.authtoken){
            sessionStorage.setItem('authtoken', json.authtoken);
            sessionStorage.setItem('email', json.email);
            sessionStorage.setItem('name', firstName);
            setIsLoggedIn(true);
            navigate('/app');
        }
        if(json.error){
            setShowerr(json.error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                        <div className="mb-4">
                            <label>First Name</label>
                            <input type="text" id='firstName' className="form-control" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <label>Last Name</label>
                            <input type="text" id='lastName' className="form-control" placeholder="Enter Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <label>email</label>
                            <input type="text" id='email' className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label>Password</label>
                            <input type="password" id='password' className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button onClick={handleRegister} className="btn btn-primary btn-block">Register</button>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>

    )//end of return
}

export default RegisterPage;