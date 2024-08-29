// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home'
import CreateOrder from './Components/CreateOrder';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-order/:id" element={<CreateOrder />} />
          <Route path="/protected-route" element={<ProtectedRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
