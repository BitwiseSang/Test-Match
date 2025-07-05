import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function ClientNavbar() {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.navbarTitle}>Test-Match</h1>
      <div className={styles.navbarLinks}>
        <Link to="/client/dashboard" className={styles.link}>
          Home
        </Link>
        <Link to="/client/test-cycles" className={styles.link}>
          Test Cycles
        </Link>
        <Link to="/client/invites" className={styles.link}>
          Invites
        </Link>
      </div>
    </nav>
  );
}
