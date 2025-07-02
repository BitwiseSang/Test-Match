// src/components/InvitationCard.jsx
import api from '../api/axios';
import { useState } from 'react';

export default function InvitationCard({ data, onAction }) {
  const [loading, setLoading] = useState(false);

  const respondToInvite = async (status) => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      await api.post(
        `/invitations/${data.id}/respond`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onAction && onAction(); // Refresh parent list
    } catch (err) {
      console.error(`Failed to ${status.toLowerCase()} invite`, err);
      alert(`Could not ${status.toLowerCase()} invitation.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>{data.testCycle?.title || 'Unnamed Test'}</h3>
      <p>
        Status: <strong>{data.status}</strong>
      </p>
      <p>Sent: {new Date(data.sentAt).toLocaleString()}</p>
      {data.respondedAt && (
        <p>Responded: {new Date(data.respondedAt).toLocaleString()}</p>
      )}

      {data.status === 'PENDING' && (
        <div style={{ marginTop: '10px' }}>
          <button
            onClick={() => respondToInvite('ACCEPTED')}
            disabled={loading}
            style={{ marginRight: '10px' }}
          >
            Accept
          </button>
          <button
            onClick={() => respondToInvite('DECLINED')}
            disabled={loading}
            style={{ backgroundColor: '#f44336', color: 'white' }}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
}
