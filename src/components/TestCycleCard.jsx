import { useNavigate } from 'react-router-dom';
import '../styles/card.css';

export default function TestCycleCard({ data }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/test-cycles/${data.id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <h3>{data.title}</h3>
      <p>
        <strong>Description:</strong> {data.description}
      </p>
      <p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={`status-badge status-${data.status}`}>
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
