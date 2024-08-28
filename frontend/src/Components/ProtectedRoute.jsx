// src/components/ProtectedRoute.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, logout } = useContext(AuthContext);
  
  const handleClick = (e) =>{
    e.preventDefault();
    logout()
  }

  return (
    <div>
      {user ? (
        <>
        <h1>Welcome, {user.email}! This is a protected route.</h1>
        <button onClick={(e) => handleClick(e)}>Logout</button>
        </>
        
      ) : (
        <h1>You are not authorized to view this page.</h1>
      )}
    </div>
  );
};

export default ProtectedRoute;
