import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthForm.css';

export default function ClientLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        'https://test-match-server.onrender.com/api/auth/client/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/client/dashboard');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert(`Something went wrong.:\n${err}`);
    }
  };

  return (
    <div className="auth-container">
      <h2>Client Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <a href="/client/register">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
