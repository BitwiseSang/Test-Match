import { useNavigate } from 'react-router-dom';
import styles from './TestCycleCard.module.css';
export default function TestCycleCard({ data }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/test-cycles/${data.id}`);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'OPEN':
        return styles.statusOPEN;
      case 'CLOSED':
        return styles.statusCLOSED;
      case 'COMPLETED':
        return styles.statusCOMPLETED;
      // Add more cases as needed
      case 'CANCELLED':
        return styles.statusCANCELLED;
      default:
        return '';
    }
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <h3>{data.title}</h3>
      <p>
        <strong>Description:</strong> {data.description}
      </p>
      <p>
        <p>
          <strong>Status:</strong>{' '}
          <span
            className={`${styles.statusBadge} ${getStatusClass(data.status)}`}
          >
            {data.status}
          </span>
        </p>
        <strong>Slots:</strong> {data.slots}
      </p>
      <p>
        <strong>Required Locations:</strong> {data.requiredLocation.join(', ')}
      </p>
      <p>
        <strong>Required Devices:</strong> {data.requiredDevices.join(', ')}
      </p>
      <p>
        <strong>Start:</strong> {new Date(data.startDate).toLocaleDateString()}
      </p>
      <p>
        <strong>End:</strong> {new Date(data.endDate).toLocaleDateString()}
      </p>
    </div>
  );
}
