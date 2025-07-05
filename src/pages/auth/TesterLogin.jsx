import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import styles from './TesterLogin.module.css';
import toast from 'react-hot-toast';

export default function TesterLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const toastLoadingId = toast.loading('Logging in, please wait...');
      const res = await axios.post('/auth/tester/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Successfully logged in', { id: toastLoadingId });
      navigate('/tester/dashboard');
    } catch (err) {
      toast.error(`Login failed, try again.\n${err}`);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2>Tester Login</h2>
        {error && <p className={styles.authError}>{error}</p>}

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
        <p className={styles.authSwitch}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}
