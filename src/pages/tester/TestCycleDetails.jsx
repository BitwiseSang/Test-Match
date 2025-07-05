import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import BackButton from '../../components/BackButton';

export default function TestCycleDetails() {
  const { id } = useParams();
  const [cycle, setCycle] = useState(null);

  useEffect(() => {
    const fetchCycle = async () => {
      try {
        const res = await api.get(`/test-cycles/tester/cycle/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCycle(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCycle();
  }, [id]);

  if (!cycle) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <BackButton />
      <div style={{ padding: '2rem' }}>
        <h2>{cycle.title}</h2>
        <p>
          <strong>Status:</strong> {cycle.status}
        </p>
        <p>
          <strong>Description:</strong> {cycle.description}
        </p>
        <p>
          <strong>Start:</strong>{' '}
          {new Date(cycle.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End:</strong> {new Date(cycle.endDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Required Locations:</strong>{' '}
          {cycle.requiredLocation.join(', ')}
        </p>
        <p>
          <strong>Required Devices:</strong> {cycle.requiredDevices.join(', ')}
        </p>
        <p>
          <strong>Required OS:</strong> {cycle.requiredOS.join(', ')}
        </p>
        <p>
          <strong>Slots:</strong> {cycle.slots}
        </p>
      </div>
    </>
  );
}
