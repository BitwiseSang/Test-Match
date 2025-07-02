import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TesterLogin from './pages/auth/TesterLogin';
import TesterRegister from './pages/auth/TesterRegister';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<TesterLogin />} />
        <Route path="/register" element={<TesterRegister />} />
        {/* TODO: Add dashboard later */}
      </Routes>
    </Router>
  );
}

export default App;
