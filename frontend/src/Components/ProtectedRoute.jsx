import { useState, useEffect, useContext, } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OrdersList = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      if (authLoading || !user || !user.userId || !user.role) return;
      try {
        if(user.role === 'buyer'){
          const response = await fetch(`http://localhost:3001/purchase-orders/${user.userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error('Failed to fetch purchase orders');
          }
          const data = await response.json();
        setOrders(data);
        }else if (user.role === 'supplier'){
          const response = await fetch('http://localhost:3001/purchaseorders/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error('Failed to fetch purchase orders');
          }
          const data = await response.json();
        setOrders(data);
        console.log(orders)
        }
        }catch (err) {
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
    navigate('/')
  };

  if (!user) return <p className="text-center text-gray-500">Opps... Parece que voce ainda não tem um login ativo</p>
  if (authLoading || !user) return <p className="text-center text-gray-500">Loading user data...</p>;
  if (loading) return <p className="text-center text-gray-500">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className='flex justify-between'>
  <h1 className="text-2xl font-bold mb-6 text-gray-800">Suas Ordens de Compra</h1>
  <button onClick={() => navigate(`/create-order/${user.userId}`)} className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150">
    Gerar Ordem de Compra
  </button>

  <button
                onClick={handleLogout}
                className="bg-[#dcdcdc] text-[#000000] py-2 px-4 rounded hover:bg-[#b3b3b3]"
              >
                Logout
              </button>
</div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{order.material_name}</h2>
            <p className="text-gray-600">Quantidade: <span className="font-medium">{order.quantity}</span></p>
            <p className="text-gray-600">Preço pedido: <span className="font-medium">${order.max_price}</span></p>
            <p className="text-gray-600">Status: <span className={`font-medium ${order.status === 'ativa' ? 'text-green-600' : order.status === 'Inativa'?'text-red-600' : 'text-yellow-600'}`}>{order.status}</span></p>
            <p className="text-gray-600">Data de entrega: <span className="font-medium">{new Date(order.delivery_date).toLocaleDateString()}</span></p>
            <p className="text-gray-600">Endereço para entrega: <span className="font-medium">{order.delivery_address}</span></p>
            <p className="text-gray-600">Frete negociado: <span className="font-medium">${order.freight_price}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
