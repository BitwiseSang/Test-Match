import { Link, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import api from '../api/axios';
import './Navbar.css';
import defaultAvatar from '../assets/default-avatar.png';

export default function Navbar() {
  // const [avatarUrl, setAvatarUrl] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchAvatar = async () => {
  //     try {
  //       const res = await api.get('/tester/profile', {
  //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  //         responseType: 'arraybuffer',
  //       });

  //       console.error(res);

  //       if (res.data) {
  //         const base64 = btoa(
  //           new Uint8Array(res.data).reduce(
  //             (data, byte) => data + String.fromCharCode(byte),
  //             ''
  //           )
  //         );
  //         console.warn(res.data);
  //         setAvatarUrl(`data:image/jpeg;base64,${base64}`);
  //       }
  //     } catch (err) {
  //       console.error('Could not fetch avatar:', err);
  //     }
  //   };

  //   fetchAvatar();
  // }, []);

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Test-Match</h1>
      <div className="navbar-links">
        <Link to="/tester/dashboard">Home</Link>
        <Link to="/tester/test-cycles">Test Cycles</Link>
        <Link to="/tester/invitations">Invitations</Link>
        {/* <img
            src={avatarUrl}
            className="avatar"
            alt="Profile Avatar"
            style={{ maxWidth: '200px' }}
            onClick={() => navigate('/tester/profile')}
          /> */}
        <img
          src={defaultAvatar}
          className="avatar"
          alt="Profile Avatar"
          style={{ maxWidth: '200px' }}
          onClick={() => navigate('/tester/profile')}
        />
      </div>
    </nav>
  );
}
