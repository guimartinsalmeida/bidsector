import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    material_name: '',
    quantity: '',
    max_price: '',
    freight_price: '',
    delivery_address: '',
    delivery_date: '',
    pdf_url: '',
    photo_url: '',
    buyer_id: id,
    status: 'ativa',
    thickness: '',
    width: '',
    length: '',
    diameter: '',
    color: '',
    machined: '',
  });

  const [activeSection, setActiveSection] = useState('basic-info');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Você precisa estar logado para criar um pedido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/purchase-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/protected-route');
        console.log('Pedido criado com sucesso', data);
      } else {
        alert('Erro ao criar pedido');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-8 p-8 bg-white shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Criar Pedido</h2>
      
      {/* Accordion Section 1: Informações Básicas */}
      <div className="border-t border-gray-300 mt-4">
        <button
          type="button"
          onClick={() => toggleSection('basic-info')}
          className="w-full text-left py-3 px-4 text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none"
        >
          Informações Básicas
        </button>
        {activeSection === 'basic-info' && (
          <div className="p-4 bg-gray-50 border-t border-gray-300">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {['material_name', 'quantity', 'max_price', 'freight_price', 'delivery_address', 'delivery_date', 'pdf_url', 'photo_url'].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">{field.replace('_', ' ')}:</label>
                  <input
                    type={field === 'delivery_date' ? 'date' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder={`Digite ${field.replace('_', ' ')}`}
                  />
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="ativa">Ativa</option>
                  <option value="inativa">Inativa</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-300 mt-4">
        <button
          type="button"
          onClick={() => toggleSection('product-description')}
          className="w-full text-left py-3 px-4 text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none"
        >
          Descrição do Produto
        </button>
        {activeSection === 'product-description' && (
          <div className="p-4 bg-gray-50 border-t border-gray-300">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {['thickness', 'width', 'length', 'diameter', 'color', 'machined'].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">{field.replace('_', ' ')}:</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder={`Digite ${field.replace('_', ' ')}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Criar Pedido
        </button>
      </div>
    </form>
  );
};

export default CreateOrder;
