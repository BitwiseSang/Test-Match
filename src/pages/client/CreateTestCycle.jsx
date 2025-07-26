import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import ClientNavbar from '../../components/ClientNavbar';
import styles from './createTestCycle.module.css';

const OS_OPTIONS = ['ANDROID', 'IOS', 'WINDOWS', 'MACOS', 'LINUX'];
const DEVICE_OPTIONS = ['MOBILE', 'TABLET', 'LAPTOP', 'DESKTOP'];

export default function CreateTestCycle() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    requiredOS: [],
    requiredDevices: [],
    requiredLocation: '',
    slots: 1,
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleMultiSelect = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((v) => v !== value)
        : [...prev[name], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      requiredLocation: form.requiredLocation
        .split(',')
        .map((l) => l.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(
        'https://test-match-server.onrender.com/api/test-cycles',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (res.ok) {
        navigate('/client/dashboard');
      } else {
        alert(data.error || 'Failed to create test cycle');
      }
    } catch (err) {
      alert(`Network error:\n${err}`);
    }
  };

  return (
    <div>
      <ClientNavbar />
      <div
        className="container"
        style={{ maxWidth: '600px', margin: '2rem auto' }}
      >
        <BackButton />
        <h2>Create Test Cycle</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            className={styles.description}
            placeholder="Description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            required
          />
          <fieldset className={styles.checklistFieldset}>
            <legend className={styles.checklistLegend}>
              Required Operating Systems
            </legend>
            {OS_OPTIONS.map((os) => (
              <label key={os} className={styles.checklistLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={form.requiredOS.includes(os)}
                  onChange={() => handleMultiSelect('requiredOS', os)}
                />{' '}
                {os}
              </label>
            ))}
          </fieldset>
          <fieldset className={styles.checklistFieldset}>
            <legend className={styles.checklistLegend}>Required Devices</legend>
            {DEVICE_OPTIONS.map((dev) => (
              <label key={dev} className={styles.checklistLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={form.requiredDevices.includes(dev)}
                  onChange={() => handleMultiSelect('requiredDevices', dev)}
                />{' '}
                {dev}
              </label>
            ))}
          </fieldset>
          <input
            type="text"
            name="requiredLocation"
            placeholder="Required Locations (comma-separated)"
            value={form.requiredLocation}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="slots"
            placeholder="Number of Slots"
            value={Number(form.slots)}
            onChange={handleChange}
            min="1"
            required
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
