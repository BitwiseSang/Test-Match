import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ViewCycleInvites() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvites = async () => {
      const res = await fetch(
        `https://test-match-server.onrender.com/api/invitations/test-cycle/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setInvitations(data || []);
      } else {
        alert(data.error || 'Failed to fetch invitations');
      }
      setLoading(false);
    };

    fetchInvites();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Invitations for Test Cycle</h2>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
        ⬅ Back
      </button>
      <button onClick={() => navigate(`/client/test-cycles/${id}/accepted`)}>
        View Accepted Testers
      </button>

      {invitations.length === 0 ? (
        <p>No invitations sent yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Tester Email</th>
              <th style={th}>Location</th>
              <th style={th}>Status</th>
              <th style={th}>Sent At</th>
              <th style={th}>Responded At</th>
            </tr>
          </thead>
          <tbody>
            {invitations.map((inv) => (
              <tr key={inv.id}>
                <td style={td}>{inv.tester.email}</td>
                <td style={td}>{inv.tester.location}</td>
                <td style={{ ...td, color: statusColor(inv.status) }}>
                  {inv.status}
                </td>
                <td style={td}>{new Date(inv.sentAt).toLocaleDateString()}</td>
                <td style={td}>
                  {inv.respondedAt
                    ? new Date(inv.respondedAt).toLocaleDateString()
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  borderBottom: '1px solid #ccc',
  padding: '0.5rem',
  textAlign: 'left',
};

const td = {
  borderBottom: '1px solid #eee',
  padding: '0.5rem',
};

const statusColor = (status) => {
  switch (status) {
    case 'ACCEPTED':
      return 'green';
    case 'DECLINED':
      return 'red';
    default:
      return '#555';
  }
};
