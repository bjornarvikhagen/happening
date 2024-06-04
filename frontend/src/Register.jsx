import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', registerInfo);
      console.log('Registration successful', response.data);
    } catch (error) {
      console.error('Registration failed', error.response.data);
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      <input type="email" name="email" value={registerInfo.email} onChange={handleRegisterChange} placeholder="Email" />
      <input type="password" name="password" value={registerInfo.password} onChange={handleRegisterChange} placeholder="Password" />
      <input type="text" name="name" value={registerInfo.name} onChange={handleRegisterChange} placeholder="Name" />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;