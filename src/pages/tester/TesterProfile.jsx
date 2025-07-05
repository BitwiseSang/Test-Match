import { useState, useEffect } from 'react';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import toast from 'react-hot-toast';
import styles from './TesterProfile.module.css';
import BackButton from '../../components/BackButton';

export default function TesterProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/tester/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setFormData({
          name: res.data.name || '',
          email: res.data.email || '',
          location: res.data.location || '',
        });
      } catch (err) {
        console.error('Profile load error:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const form = new FormData();
    form.append('name', formData.name);
    form.append('location', formData.location);
    if (avatarFile) form.append('avatar', avatarFile);

    try {
      const loadingToastId = toast.loading('Updating Profile');
      await api.patch('/auth/tester/profile', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      // alert('Profile updated!');
      toast.success('Profile Updated', { id: loadingToastId });
    } catch (err) {
      // alert('Update failed.');
      toast.error('Failed to update profile');
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.profileContainer}>
        <BackButton />
        <div className={styles.profileFormContainer}>
          <h2>Update Profile</h2>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className={styles.profileForm}
          >
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <label>Avatar</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <button type="submit" style={{ marginTop: '1rem' }}>
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
