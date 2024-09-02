// SupplierOrders.js
import React from 'react';

const SupplierOrders = ({ orders }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map(order => (
        <div key={order.id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Ordem {order.id}</h2>
          <p className="text-gray-600">Material: <span className="font-medium">{order.material_name || 'N/A'}</span></p>
          <p className="text-gray-600">Quantidade: <span className="font-medium">{order.quantity || 'N/A'}</span></p>
          <p className="text-gray-600">Preço pedido: <span className="font-medium">${order.max_price || 'N/A'}</span></p>
          <p className="text-gray-600">Status: <span className={`font-medium ${order.status === 'ativa' ? 'text-green-600' : order.status === 'Inativa' ? 'text-red-600' : 'text-yellow-600'}`}>{order.status || 'N/A'}</span></p>
          <p className="text-gray-600">Data de entrega: <span className="font-medium">{order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'N/A'}</span></p>
          <p className="text-gray-600">Endereço para entrega: <span className="font-medium">{order.delivery_address || 'N/A'}</span></p>
          <p className="text-gray-600">Frete negociado: <span className="font-medium">${order.freight_price || 'N/A'}</span></p>

          {/* Exibindo especificações de material */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Especificações do Material:</h3>
            <p className="text-gray-600">Espessura: <span className="font-medium">{order.thickness || 'N/A'}</span></p>
            <p className="text-gray-600">Largura: <span className="font-medium">{order.width || 'N/A'}</span></p>
            <p className="text-gray-600">Comprimento: <span className="font-medium">{order.length || 'N/A'}</span></p>
            <p className="text-gray-600">Diâmetro: <span className="font-medium">{order.diameter || 'N/A'}</span></p>
            <p className="text-gray-600">Cor: <span className="font-medium">{order.color || 'N/A'}</span></p>
            <p className="text-gray-600">Usinado: <span className="font-medium">{order.machined ? 'Sim' : 'Não'}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupplierOrders;
