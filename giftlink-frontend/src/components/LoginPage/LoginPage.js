import React, { useState, useEffect } from 'react';
import { urlConfig } from '../../config'
import { useAppContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [incorrect, setIncorrect] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();
    const bearerToken =  sessionStorage.getItem('bearer-token');
    useEffect(() => {
      if(sessionStorage.getItem('auth-token')) {
        navigate('/app');
      }
    },[navigate])

    const handleLogin = async (e) => {
      const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': bearerToken ? `Bearer ${bearerToken}` : '', // Include Bearer token if available
          },
          body: JSON.stringify({
              email: email, 
              password: password
          }),
      });

      const json = await res.json();
      console.log('json', json);
      if(json.authtoken){
          sessionStorage.setItem('auth-token', json.authtoken);
          sessionStorage.setItem('name', json.userName);
          sessionStorage.setItem('email', json.userEmail);
          setIsLoggedIn(true);
          navigate('/app');
      } else {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        setIncorrect("Wrong password. Try again.");
        setTimeout(() => {
          setIncorrect("");
        }, 2000);
      }
    }

        return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-card p-4 border rounded">
                <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                <div className="mb-4">
                    <label>Email</label>
                    <input type="text" id='email' className="form-control" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value); setIncorrect("")}} />
                    <label>Password</label>
                    <input type="password" id='password' className="form-control" placeholder="Enter password" value={password} onChange={(e) => {setPassword(e.target.value); setIncorrect("")}} />

                    <span style={{color:'red',height:'.5cm',display:'block',fontStyle:'italic',fontSize:'12px'}}>{incorrect}</span>

                </div>
                <button onClick={handleLogin} className="btn btn-primary w-100 mb-3">Login</button>
                <p className="mt-4 text-center">
                    New here? <a href="/app/register" className="text-primary">Register Here</a>
                </p>

            </div>
          </div>
        </div>
      </div>
    )
}

export default LoginPage;