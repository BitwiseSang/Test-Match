import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TesterLogin from './pages/auth/TesterLogin';
import TesterRegister from './pages/auth/TesterRegister';
import TesterDashboard from './pages/tester/TesterDashboard';
import ClientLogin from './pages/client/ClientLogin';
import ClientSignup from './pages/client/ClientRegister';
import ClientDashboard from './pages/client/ClientDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<TesterLogin />} />
        <Route path="/register" element={<TesterRegister />} />
        <Route path="/tester/dashboard" element={<TesterDashboard />} />;
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/client/signup" element={<ClientSignup />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
