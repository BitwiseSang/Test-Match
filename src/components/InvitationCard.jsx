import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import styles from './InvitationCard.module.css';

export default function InvitationCard({ data }) {
  const navigate = useNavigate();
  const handleRespond = async (status) => {
    try {
      await api.post(
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

  const handleClick = () => {
    navigate(`/test-cycles/${data.testCycle.id}`);
  };
  // console.log(data);

  return (
    <div className={styles.card} onClick={handleClick}>
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
        <div className={styles.actions}>
          <button
            onClick={() => handleRespond('ACCEPTED')}
            className={styles.accept}
          >
            Accept
          </button>
          <button
            onClick={() => handleRespond('DECLINED')}
            className={styles.decline}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
}
