// src/pages/auth/TesterLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import '../../styles/auth.css';

export default function TesterLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/tester/login', { email, password });
      console.log(res);
      localStorage.setItem('token', res.data.token);
      navigate('/tester/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Tester Login</h2>
        {error && <p className="auth-error">{error}</p>}
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
        <p className="auth-switch">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}
