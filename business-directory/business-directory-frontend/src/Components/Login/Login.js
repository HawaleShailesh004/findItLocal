// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Create a simple B&W theme
import { useUser } from '../../Context/UserContext';

import Footer from "../Footer"
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      setError(''); // Clear any errors
      alert('Login Successful');
      navigate('/');

    } catch (err) {
      setError('Invalid Credentials');
    }
  };

  return (
    <>
    <div className={styles['login-container']}>
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>Login</h2>
      {error && <p className={styles['error']}>{error}</p>}
      <div className={styles['input-group']}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles['email-input']} // New class name
        />
      </div>
      <div className={styles['input-group']}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles['password-input']}   
// New class name
        />
      </div>
      <button type="submit" className={styles['login-btn']}>
        Login
      </button>
    </form>
  </div>
  <Footer/>
  </>
  );
};

export default Login;
