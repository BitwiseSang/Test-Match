import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api/axios';
import InvitationCard from '../../components/InvitationCard';
import TestCycleCard from '../../components/TestCycleCard';
import styles from './TesterDashboard.module.css';

export default function TesterDashboard() {
  const [invitations, setInvitations] = useState([]);
  const [testCycles, setTestCycles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const [invitesRes, cyclesRes] = await Promise.all([
          api.get('/invitations/me', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get('/test-cycles/all', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        // console.log(invitesRes.data);
        setInvitations(invitesRes.data || []);
        setTestCycles(cyclesRes.data || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <div className={styles.section}>
          <h2>My Invitations</h2>
          <div className={styles.cardList}>
            {invitations.length === 0 ? (
              <p>No invitations yet.</p>
            ) : (
              invitations.map((inv) => (
                <InvitationCard key={inv.id} data={inv} />
              ))
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Available Test Cycles</h2>
          <div className={styles.testCyclesContainer}>
            {testCycles.length === 0 ? (
              <p>No test cycles available.</p>
            ) : (
              testCycles.map((cycle) => (
                <TestCycleCard key={cycle.id} data={cycle} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
