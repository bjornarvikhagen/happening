import React, { useState } from 'react';
import axios from 'axios';


function Login({ setIsLoggedIn }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', loginInfo);
      console.log('Login successful', response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed', error.response.data);
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <input type="email" name="email" value={loginInfo.email} onChange={handleLoginChange} placeholder="Email" />
      <input type="password" name="password" value={loginInfo.password} onChange={handleLoginChange} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;