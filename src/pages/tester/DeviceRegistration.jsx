import { useState, useEffect, useMemo } from 'react'; // Import useMemo
import axios from '../../api/axios';
import styles from './DeviceRegistration.module.css';
import Navbar from '../../components/Navbar';
import toast from 'react-hot-toast';
import BackButton from '../../components/BackButton';

const Modal = ({ children, show, onClose, title }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

const DeviceRegistration = () => {
  const [form, setForm] = useState({
    type: '',
    os: '',
    osVersion: '',
    brand: '',
    model: '',
  });
  const [devices, setDevices] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  // New state for sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const fetchDevices = async () => {
    setFetchLoading(true);
    try {
      const res = await axios.get('/device', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDevices(res.data.devices);
    } catch (err) {
      console.error('Error fetching devices:', err);
      setError(err.response?.data?.error || 'Failed to load devices');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (
      !form.type ||
      !form.os ||
      !form.osVersion ||
      !form.brand ||
      !form.model
    ) {
      setError('All fields are required');
      toast.error('Please fill in all fields');
      return;
    }
    setFormLoading(true);
    const toastLoadingId = toast.loading('Registering Device');
    try {
      await axios.post('/device', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setForm({ type: '', os: '', osVersion: '', brand: '', model: '' });
      await fetchDevices();
      toast.success('Device Registered Successfully', { id: toastLoadingId });
      setShowModal(false);
    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed';
      toast.error(msg, { id: toastLoadingId });
      setError(msg);
    } finally {
      setFormLoading(false);
    }
  };

  // Sorting logic using useMemo to optimize performance
  const sortedDevices = useMemo(() => {
    let sortableDevices = [...devices];
    if (sortConfig.key !== null) {
      sortableDevices.sort((a, b) => {
        const aValue = String(a[sortConfig.key]).toLowerCase();
        const bValue = String(b[sortConfig.key]).toLowerCase();

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableDevices;
  }, [devices, sortConfig]);

  // Function to handle sorting changes
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Helper to get sort indicator (arrow up/down)
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <BackButton />
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Your Registered Devices</h2>

          <div className={styles.sortControls}>
            <span>Sort by:</span>
            <button
              onClick={() => requestSort('brand')}
              className={styles.sortButton}
            >
              Brand {getSortIndicator('brand')}
            </button>
            <button
              onClick={() => requestSort('model')}
              className={styles.sortButton}
            >
              Model {getSortIndicator('model')}
            </button>
            <button
              onClick={() => requestSort('os')}
              className={styles.sortButton}
            >
              OS {getSortIndicator('os')}
            </button>
            <button
              onClick={() => requestSort('type')}
              className={styles.sortButton}
            >
              Type {getSortIndicator('type')}
            </button>
          </div>

          {fetchLoading && (
            <div className={styles.loadingSpinner}>
              <div className={styles.spinner}></div>
              <p>Loading devices...</p>
            </div>
          )}
          {!fetchLoading && devices.length === 0 && (
            <p className={styles.noDevices}>No devices registered yet.</p>
          )}
          {!fetchLoading && devices.length > 0 && (
            <ul className={styles.deviceList}>
              {sortedDevices.map(
                (
                  d // Use sortedDevices here
                ) => (
                  <li key={d.id} className={styles.deviceItem}>
                    <strong>
                      {d.brand} {d.model}
                    </strong>{' '}
                    — {d.os} {d.osVersion} ({d.type.toLowerCase()})
                  </li>
                )
              )}
            </ul>
          )}

          <hr className={styles.divider} />

          <div className={styles.registerButtonContainer}>
            <button
              className={styles.button}
              onClick={() => setShowModal(true)}
            >
              Register New Device
            </button>
          </div>

          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            title="Register New Device"
          >
            {error && (
              <p className={styles.errorMessage} aria-live="polite">
                {error}
              </p>
            )}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="type" className={styles.label}>
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={styles.input}
                  required
                >
                  <option value="">Select</option>
                  <option value="MOBILE">Mobile</option>
                  <option value="TABLET">Tablet</option>
                  <option value="LAPTOP">Laptop</option>
                  <option value="DESKTOP">Desktop</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="os" className={styles.label}>
                  Operating System
                </label>
                <select
                  id="os"
                  name="os"
                  value={form.os}
                  onChange={handleChange}
                  className={styles.input}
                  required
                >
                  <option value="">Select</option>
                  <option value="ANDROID">Android</option>
                  <option value="IOS">iOS</option>
                  <option value="WINDOWS">Windows</option>
                  <option value="MACOS">macOS</option>
                  <option value="LINUX">Linux</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="osVersion" className={styles.label}>
                  OS Version
                </label>
                <input
                  id="osVersion"
                  name="osVersion"
                  value={form.osVersion}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="brand" className={styles.label}>
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="model" className={styles.label}>
                  Model
                </label>
                <input
                  id="model"
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className={styles.button}
              >
                {formLoading ? 'Registering...' : 'Register Device'}
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default DeviceRegistration;
