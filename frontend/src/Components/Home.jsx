import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <div>
      <p>home page</p>
      <button onClick={(e) => handleSubmit(e) }>Logout</button>
    </div>
  )
}

export default Home
