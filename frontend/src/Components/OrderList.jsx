import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BuyerOrders from './BuyerOrders';
import SupplierOrders from './SupplierOrders';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';


const OrdersList = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (authLoading || !user || !user.userId || !user.role) return;
      try {
        let response;
        if (user.role === 'buyer') {
          response = await fetch(`http://localhost:3001/purchase-orders/${user.userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
            credentials: 'include',
          });
        } else if (user.role === 'supplier') {
          response = await fetch('http://localhost:3001/purchaseorders/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
            credentials: 'include',
          });
        }

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, authLoading]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  if (!user) return <p className="text-center text-gray-500">Opps... Parece que voce ainda não tem um login ativo</p>;
  if (authLoading || !user) return <p className="text-center text-gray-500">Loading user data...</p>;
  if (loading) return <p className="text-center text-gray-500">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mb-8">
  <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
    {user.userId === 'buyer' ? 'Suas Ordens de Compra' : 'Ordens de Compras Feitas'}
  </h1>

  <div className="flex gap-4">
    {user.role === 'buyer' && (
      <button
        onClick={() => navigate(`/create-order/${user.userId}`)}
        className="flex items-center bg-green-500 text-white py-2 px-4 md:py-2 md:px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition ease-in-out duration-150 text-sm md:text-base"
      >
        <FaPlus className="mr-2 text-lg md:text-xl" />
        Gerar Ordem de Compra
      </button>
    )}

    <button
      onClick={handleLogout}
      className="flex items-center bg-gray-300 text-gray-800 py-2 px-4 md:py-2 md:px-6 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition ease-in-out duration-150 text-sm md:text-base"
    >
      <FaSignOutAlt className="mr-2 text-lg md:text-xl" />
      Logout
    </button>
  </div>
</div>

      {user.role === 'buyer' ? (
        <BuyerOrders orders={orders} />
      ) : (
        <SupplierOrders orders={orders} />
      )}
    </div>
  );
};

export default OrdersList;
