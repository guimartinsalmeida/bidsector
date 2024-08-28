import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const handleCreateOrder = () => {
    navigate('/create-order'); 
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.email}! This is a protected route.</h1>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleCreateOrder}>Create Order</button>
        </>
      ) : (
        <h1>You are not authorized to view this page.</h1>
      )}
    </div>
  );
};

export default ProtectedRoute;
