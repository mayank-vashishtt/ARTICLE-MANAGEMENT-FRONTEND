import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';  // Your login API call
import jwt_decode from 'jwt-decode';  // This is the correct syntax for most cases if jwt_decode is exported as default // To decode the JWT token

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the API to log the user in
      const response = await loginUser(email, password);
      
      // Store the token in localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Decode the JWT token to get the user ID
      const decodedToken = jwt_decode(token);
      localStorage.setItem('userId', decodedToken.user.id);  // Store user ID in localStorage

      // Redirect to articles page
      navigate('/articles');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
