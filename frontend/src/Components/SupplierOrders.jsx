/* eslint-disable react/prop-types */
import { FaBox, FaDollarSign, FaCalendarDay, FaMapMarkerAlt, FaTruck, FaCogs, FaUserTie, FaIdCard, FaPlus } from 'react-icons/fa';
const SupplierOrders = ({ orders }) => {
  
  const sendEmail = async (email, name, materialName, responsibleName, price) => {
    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, materialName, responsibleName, price })
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      const data = await response.json();
      console.log('Email sent successfully', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleClick = async (email, name, materialName, responsibleName, price) =>{
      sendEmail(email, name, materialName, responsibleName, price)
  }

  console.log(orders)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {orders.map((order, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className='flex flex-row'>
            <FaBox className="text-indigo-500 text-3xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800"> {order.company_name}</h2>
            </div>
           <div>
            <button
            className="flex items-center bg-green-500 text-white py-2 px-4 md:py-2 md:px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition ease-in-out duration-150 text-sm md:text-base"
            onClick={()=> handleClick(order.email, order.company_name, order.material_name, order.responsible_name, order.max_price)}
            >
              <FaPlus className="mr-2 text-lg md:text-xl" />
            Aceitar</button>
           </div>

          </div>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <FaBox className="text-gray-500 mr-2" />
              <p className="font-medium">Material: {order.material_name || 'N/A'}</p>
            </div>
            
            <div className="flex items-center text-gray-600">
              <FaBox className="text-gray-500 mr-2" />
              <p className="font-medium">Quantidade: {order.quantity || 'N/A'}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <FaDollarSign className="text-gray-500 mr-2" />
              <p className="font-medium">Preço pedido: ${order.max_price || 'N/A'}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <p className={`font-medium ${order.status === 'ativa' ? 'text-green-600' : order.status === 'Inativa' ? 'text-red-600' : 'text-yellow-600'}`}>
                Status: {order.status || 'N/A'}
              </p>
            </div>
            <div className="flex items-center text-gray-600">
              <FaUserTie className="text-gray-500 mr-2" />
              <p className="font-medium">Responsavel: {order.responsible_name || 'N/A'} - {order.responsible_position}</p>
            </div>
            <div className="flex items-center text-gray-600">
            <FaIdCard className="text-gray-500 mr-2"/>
            <p className="font-medium">CNPJ: {order.cnpj || 'N/A'}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <FaCalendarDay className="text-gray-500 mr-2" />
              <p className="font-medium">Data de entrega: {order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <p className="font-medium">Endereço para entrega: {order.delivery_address || 'N/A'}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <FaTruck className="text-gray-500 mr-2" />
              <p className="font-medium">Frete negociado: ${order.freight_price || 'N/A'}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Especificações do Material:</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaCogs className="text-gray-500 mr-2" />
                  <p className="font-medium">Espessura: {order.thickness || 'N/A'}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCogs className="text-gray-500 mr-2" />
                  <p className="font-medium">Largura: {order.width || 'N/A'}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCogs className="text-gray-500 mr-2" />
                  <p className="font-medium">Comprimento: {order.length || 'N/A'}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCogs className="text-gray-500 mr-2" />
                  <p className="font-medium">Diâmetro: {order.diameter || 'N/A'}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCogs className="text-gray-500 mr-2" />
                  <p className="font-medium">Cor: {order.color || 'N/A'}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCogs className="text-gray-500 mr-2" />
                  <p className="font-medium">Usinado: {order.machined ? 'Sim' : 'Não'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupplierOrders;
