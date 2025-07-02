import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Tester Portal</h1>
      <div className="navbar-links">
        <Link to="/tester/dashboard">Home</Link>
        <Link to="/tester/test-cycles">Test Cycles</Link>
        <Link to="/tester/invitations">Invitations</Link>
      </div>
    </nav>
  );
}
