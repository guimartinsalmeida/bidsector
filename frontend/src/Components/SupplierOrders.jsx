import { FaBox, FaDollarSign, FaCalendarDay, FaMapMarkerAlt, FaTruck, FaCogs } from 'react-icons/fa';

const SupplierOrders = ({ orders }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {orders.map(order => (
        <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <div className="flex items-center mb-4">
            <FaBox className="text-indigo-500 text-3xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Ordem {order.id}</h2>
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
