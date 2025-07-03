import api from '../api/axios';
import '../styles/card.css';

export default function InvitationCard({ data }) {
  const handleRespond = async (status) => {
    try {
      await api.patch(
        `/invitations/${data.id}/respond`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      window.location.reload(); // or use state to avoid reload
    } catch (err) {
      alert('Failed to respond to invitation');
      console.error(err);
    }
  };

  return (
    <div className="card">
      <p>
        <strong>Test:</strong> {data.testCycle.title}
      </p>
      <p>
        <strong>Status:</strong> {data.status}
      </p>
      <p>
        <strong>Invited:</strong> {new Date(data.sentAt).toLocaleString()}
      </p>

      {data.status === 'PENDING' && (
        <div className="actions">
          <button onClick={() => handleRespond('ACCEPTED')} className="accept">
            Accept
          </button>
          <button onClick={() => handleRespond('DECLINED')} className="decline">
            Decline
          </button>
        </div>
      )}
    </div>
  );
}
