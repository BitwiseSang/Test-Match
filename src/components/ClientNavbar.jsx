import { Link } from 'react-router-dom';
import './Navbar.css';

export default function ClientNavbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Test-Match</h1>
      <div className="navbar-links">
        <Link to="">Home</Link>
        <Link to="">Test Cycles</Link>
        <Link to="">Invites</Link>
      </div>
    </nav>
  );
}
