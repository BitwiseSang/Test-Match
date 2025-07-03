import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OS_OPTIONS = ['ANDROID', 'IOS', 'WINDOWS', 'MACOS', 'LINUX'];
const DEVICE_OPTIONS = ['MOBILE', 'TABLET', 'LAPTOP', 'DESKTOP'];

export default function EditTestCycle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCycle = async () => {
      const res = await fetch(
        `https://test-match-server.onrender.com/api/test-cycles/cycle/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setForm({
          ...data,
          requiredOS: data.requiredOS.map((os) => os.toUpperCase()),
          requiredDevices: data.requiredDevices.map((dev) => dev.toUpperCase()),
          requiredLocation: data.requiredLocation.join(', '),
        });
      } else {
        alert(data.error || 'Could not load test cycle');
      }
      setLoading(false);
    };
    fetchCycle();
  }, [id]);

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

    const res = await fetch(
      `https://test-match-server.onrender.com/api/test-cycles/${id}`,
      {
        method: 'PATCH',
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
      alert(data.error || 'Update failed');
    }
  };

  if (loading || !form) return <p>Loading...</p>;

  return (
    <div
      className="container"
      style={{ maxWidth: '600px', margin: '2rem auto' }}
    >
      <h2>Edit Test Cycle</h2>
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
          placeholder="Description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          required
        />

        <fieldset>
          <legend>Required Operating Systems</legend>
          {OS_OPTIONS.map((os) => (
            <label key={os} style={{ marginRight: '1rem' }}>
              <input
                type="checkbox"
                checked={form.requiredOS.includes(os)}
                onChange={() => handleMultiSelect('requiredOS', os)}
              />{' '}
              {os}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Required Devices</legend>
          {DEVICE_OPTIONS.map((dev) => (
            <label key={dev} style={{ marginRight: '1rem' }}>
              <input
                type="checkbox"
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
          value={form.slots}
          onChange={handleChange}
          min="1"
          required
        />

        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="date"
            name="startDate"
            value={form.startDate?.slice(0, 10)}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate?.slice(0, 10)}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Update
        </button>
      </form>
    </div>
  );
}
