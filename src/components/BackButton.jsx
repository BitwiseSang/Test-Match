import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';
import backIcon from '../assets/left-chevron.png';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <>
      <button
        className={styles.btn}
        onClick={() => navigate(-1)}
        style={{ marginBottom: '1rem' }}
      >
        <img className={styles.image} src={backIcon} alt="back button icon" />
      </button>
    </>
  );
}
