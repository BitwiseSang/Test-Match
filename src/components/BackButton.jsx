import { useNavigate } from 'react-router-dom';
import './BackButton.css';
import backIcon from '../assets/left-chevron.png';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        style={{ marginBottom: '1rem' }}
      >
        <img src={backIcon} alt="back button icon" />
        Back
      </button>
    </>
  );
}
