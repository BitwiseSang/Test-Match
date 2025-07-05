import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ClientRegister.module.css';

export default function ClientRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    location: '',
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    try {
      const res = await fetch('/api/auth/client/register', {
        method: 'POST',
        body: payload,
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/client/dashboard');
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (err) {
      alert(`Something went wrong.:\n${err}`);
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <h2>Client Sign Up</h2>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        <p className={styles.authSwitch}>
          Already have an account? <a href="/client/login">Login</a>
        </p>
      </form>
    </div>
  );
}
