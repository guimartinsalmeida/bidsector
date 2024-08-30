import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';
import Signup from './Signup';
import logo from '../assets/bid-logo.png';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f6]">
      <div className="flex items-center justify-center py-3.5">
        <img src={logo} alt="Logo" className="h-16 md:h-24" />
      </div>
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-[#ffffff] py-4 px-8 rounded-lg shadow-lg">
          {user ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4 text-[#111111]">Welcome, {user.email}!</h1>
              <button
                onClick={handleLogout}
                className="bg-[#dcdcdc] text-[#000000] py-2 px-4 rounded hover:bg-[#b3b3b3]"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-3.5">
                <button
                  onClick={() => setShowLogin(true)}
                  className={`px-4 py-2 rounded ${showLogin ? 'bg-[#2a2a2a] text-[#ffffff]' : 'bg-[#f6f6f6] text-[#111111]'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setShowLogin(false)}
                  className={`px-4 py-2 rounded ${!showLogin ? 'bg-[#2a2a2a] text-[#ffffff]' : 'bg-[#f6f6f6] text-[#111111]'}`}
                >
                  Signup
                </button>
              </div>
              {showLogin ? (
                <Login />
              ) : (
                <Signup />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
