import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClientDashboard() {
  const [testCycles, setTestCycles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCycles = async () => {
      const res = await fetch(
        'https://test-match-server.onrender.com/api/test-cycles/',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setTestCycles(data.cycles || []);
      } else {
        alert(data.error || 'Failed to fetch test cycles');
      }
    };
    fetchCycles();
  }, []);

  const grouped = testCycles.reduce((acc, cycle) => {
    acc[cycle.status] = acc[cycle.status] || [];
    acc[cycle.status].push(cycle);
    return acc;
  }, {});

  const statusOrder = ['OPEN', 'CLOSED', 'COMPLETED', 'CANCELLED'];

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>Client Dashboard</h1>
      <button
        onClick={() => navigate('/client/create')}
        style={{ margin: '1rem 0', padding: '0.5rem 1rem' }}
      >
        ➕ Create New Test Cycle
      </button>

      {statusOrder.map((status) => (
        <div key={status} style={{ marginBottom: '2rem' }}>
          <h2>{status} Test Cycles</h2>
          {grouped[status]?.length ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {grouped[status].map((cycle) => (
                <li
                  key={cycle.id}
                  style={{
                    border: '1px solid #ccc',
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '8px',
                  }}
                >
                  <h3>{cycle.title}</h3>
                  <p>
                    <strong>Dates:</strong> {cycle.startDate.slice(0, 10)} →{' '}
                    {cycle.endDate.slice(0, 10)}
                  </p>
                  <p>
                    <strong>Slots:</strong> {cycle.slots}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      marginTop: '0.5rem',
                    }}
                  >
                    <button
                      onClick={() =>
                        navigate(`/client/test-cycles/${cycle.id}`)
                      }
                    >
                      📊 View Invitations
                    </button>
                    {cycle.status === 'OPEN' && ( // Conditional rendering for the Edit button
                      <button
                        onClick={() =>
                          navigate(`/client/test-cycles/${cycle.id}/edit`)
                        }
                      >
                        ✏️ Edit
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No {status.toLowerCase()} test cycles.</p>
          )}
        </div>
      ))}
    </div>
  );
}
