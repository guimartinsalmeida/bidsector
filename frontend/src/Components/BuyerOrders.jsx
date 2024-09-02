const BuyerOrders = ({ orders }) => {
  return (
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
  );
};

export default BuyerOrders;
