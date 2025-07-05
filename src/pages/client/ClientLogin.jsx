import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ClientLogin.module.css';
import toast from 'react-hot-toast';

export default function ClientLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const toastLoadingId = toast.loading('Logging in, please wait...');
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
        toast.success('Successfully logged in', { id: toastLoadingId });
        navigate('/client/dashboard');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      toast.error(`Login failed, try again.\n ${err}`);
      // alert(`Something went wrong.:\n${err}`);
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2>Client Login</h2>
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
        <p className={styles.authSwitch}>
          Don’t have an account? <a href="/client/register">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
