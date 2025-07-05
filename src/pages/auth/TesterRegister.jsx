import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import styles from './TesterRegister.module.css';
import toast from 'react-hot-toast';

export default function TesterRegister() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const toastLoadingId = toast.loading(
        'Registering your account, please wait...'
      );
      await axios.post('/auth/tester/register', form);
      const res = await axios.post('/auth/tester/login', {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem('token', res.data.token);
      toast.success('Successfully created your account', {
        id: toastLoadingId,
      });
      navigate('/login');
    } catch (err) {
      toast.error('Failed to register your account, try again.');
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2>Tester Registration</h2>
        {error && <p className="auth-error">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        <p className={styles.authSwitch}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
