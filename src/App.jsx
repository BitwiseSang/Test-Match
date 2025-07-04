import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TesterLogin from './pages/auth/TesterLogin';
import TesterRegister from './pages/auth/TesterRegister';
import TesterDashboard from './pages/tester/TesterDashboard';
import ClientLogin from './pages/client/ClientLogin';
import ClientSignup from './pages/client/ClientRegister';
import ClientDashboard from './pages/client/ClientDashboard';
import CreateTestCycle from './pages/client/CreateTestCycle';
import EditTestCycle from './pages/client/EditTestCycle';
import ViewCycleInvites from './pages/client/ViewCycleInvites';
import AcceptedTesters from './pages/client/AcceptedTesters';
import { Toaster } from 'react-hot-toast';
import TestCycleDetails from './pages/tester/TestCycleDetails';
import TesterProfile from './pages/tester/TesterProfile';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<TesterLogin />} />
          <Route path="/register" element={<TesterRegister />} />
          <Route path="/tester/dashboard" element={<TesterDashboard />} />;
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path="/client/signup" element={<ClientSignup />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/create" element={<CreateTestCycle />} />
          <Route
            path="/client/test-cycles/:id"
            element={<ViewCycleInvites />}
          />
          <Route
            path="/client/test-cycles/:id/edit"
            element={<EditTestCycle />}
          />
          <Route
            path="/client/test-cycles/:id/accepted"
            element={<AcceptedTesters />}
          />
          <Route path="/test-cycles/:id" element={<TestCycleDetails />} />
          <Route path="/tester/profile" element={<TesterProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
