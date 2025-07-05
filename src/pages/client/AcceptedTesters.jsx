import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import ClientNavbar from '../../components/ClientNavbar';

export default function AcceptedTesters() {
  const { id } = useParams();
  const [accepted, setAccepted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccepted = async () => {
      const res = await fetch(
        `https://test-match-server.onrender.com/api/test-cycles/${id}/accepted-testers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setAccepted(data || []);
      } else {
        alert(data.error || 'Failed to fetch accepted testers');
      }
      setLoading(false);
    };

    fetchAccepted();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ClientNavbar />
      <div style={{ padding: '0 4rem' }}>
        <BackButton />
        <h2>Accepted Testers</h2>

        {accepted.length === 0 ? (
          <p>No testers have accepted this test cycle yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Location</th>
                <th style={th}>Accepted At</th>
                <th style={th}>Devices</th>
              </tr>
            </thead>
            <tbody>
              {accepted.map((tester) => (
                <tr key={tester.testerId}>
                  <td style={td}>{tester.name || '—'}</td>
                  <td style={td}>{tester.email}</td>
                  <td style={td}>{tester.location}</td>
                  <td style={td}>
                    {new Date(tester.acceptedAt).toLocaleString()}
                  </td>
                  <td style={td}>
                    <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                      {tester.devices?.map((device, i) => (
                        <li key={i}>
                          {device.brand} {device.model} ({device.os}{' '}
                          {device.osVersion})
                        </li>
                      )) || '—'}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
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
  verticalAlign: 'top',
};
