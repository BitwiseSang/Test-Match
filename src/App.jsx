import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TesterLogin from './pages/auth/TesterLogin';
import TesterRegister from './pages/auth/TesterRegister';
import TesterDashboard from './pages/tester/TesterDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<TesterLogin />} />
        <Route path="/register" element={<TesterRegister />} />
        <Route path="/tester/dashboard" element={<TesterDashboard />} />;
      </Routes>
    </Router>
  );
}

export default App;
