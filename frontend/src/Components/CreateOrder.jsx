import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const { user } = useContext(AuthContext); 
  const {id} = useParams()
  const navigate = useNavigate()
  console.log(id)
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
    status: 'ativa'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You need to be logged in to create an order.');
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
        console.log(user.token)
        const data = await response.json();
        navigate('/protected-route')
        console.log('Order created successfully', data);
      } else {
        alert('Error creating order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Material Name:</label>
        <input
          type="text"
          name="material_name"
          value={formData.material_name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Max Price:</label>
        <input
          type="number"
          name="max_price"
          value={formData.max_price}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Freight Price:</label>
        <input
          type="number"
          name="freight_price"
          value={formData.freight_price}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Delivery Address:</label>
        <input
          type="text"
          name="delivery_address"
          value={formData.delivery_address}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Delivery Date:</label>
        <input
          type="date"
          name="delivery_date"
          value={formData.delivery_date}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">PDF URL:</label>
        <input
          type="text"
          name="pdf_url"
          value={formData.pdf_url}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Photo URL:</label>
        <input
          type="text"
          name="photo_url"
          value={formData.photo_url}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="ativa">Ativa</option>
          <option value="inativa">Inativa</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Order
      </button>
    </form>
  );
};

export default CreateOrder;
