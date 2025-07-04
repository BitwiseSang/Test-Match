import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../styles/dashboard.css';
import ClientNavbar from '../../components/ClientNavbar';

export default function ClientDashboard() {
  const [testCycles, setTestCycles] = useState([]);
  const navigate = useNavigate();

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

  const handleCancel = async (id) => {
    const confirmCancel = confirm(
      'Are you sure you want to cancel this test cycle?'
    );
    if (!confirmCancel) return;

    const loadingToastId = toast.loading('Cancelling test cycle...');

    const res = await fetch(
      `https://test-match-server.onrender.com/api/test-cycles/${id}/status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: 'CANCELLED' }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      toast.success('Test cycle cancelled successfully!', {
        id: loadingToastId,
      });
      // alert('Test cycle cancelled.');
      fetchCycles();
    } else {
      toast.error('Failed to cancel test cycle');
      console.log(data.error);
      // alert(data.error || 'Failed to cancel test cycle');
    }
  };

  useEffect(() => {
    fetchCycles();
  }, []);

  const grouped = testCycles.reduce((acc, cycle) => {
    acc[cycle.status] = acc[cycle.status] || [];
    acc[cycle.status].push(cycle);
    return acc;
  }, {});

  const statusOrder = ['OPEN', 'CLOSED', 'COMPLETED', 'CANCELLED'];

  return (
    <>
      <ClientNavbar />
      <div className="dashboard-container">
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
            <div className="test-cycles-container">
              {grouped[status]?.length ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {grouped[status].map((cycle) => (
                    <li
                      key={cycle.id}
                      style={{
                        border: '1px solid #7a7a7a',
                        padding: '1rem',
                        marginBottom: '1rem',
                        borderRadius: '8px',
                      }}
                      className="test-cycle"
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
                        {cycle.status === 'OPEN' && (
                          <button
                            onClick={() => handleCancel(cycle.id)}
                            style={dangerBtn}
                          >
                            Cancel
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
          </div>
        ))}
      </div>
    </>
  );
}

const dangerBtn = {
  background: '#e53935',
  color: 'white',
  border: 'none',
  padding: '0.4rem 0.8rem',
  cursor: 'pointer',
  borderRadius: '4px',
};
