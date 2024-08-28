// src/components/ProtectedRoute.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  console.log(user)

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.email}! This is a protected route.</h1>
      ) : (
        <h1>You are not authorized to view this page.</h1>
      )}
    </div>
  );
};

export default ProtectedRoute;
