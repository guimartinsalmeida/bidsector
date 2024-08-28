import  { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    company_name: '',
    cnpj: '',
    address: '',
    phone1: '',
    phone2: '',
    responsible_name: '',
    responsible_cpf: '',
    responsible_phone: '',
    responsible_position: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup-buyer', formData);
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} />
      </div>
      <div>
        <label>company_name:</label>
        <input type="text" name="company_name" onChange={handleChange} />
      </div>
      <div>
        <label>cnpj:</label>
        <input type="number" name="cnpj" onChange={handleChange} />
      </div>
      <div>
        <label>address:</label>
        <input type="text" name="address" onChange={handleChange} />
      </div>
      <div>
        <label>phone1:</label>
        <input type="phone" name="phone1" onChange={handleChange} />
      </div>
      <div>
        <label>phone2:</label>
        <input type="phone" name="phone2" onChange={handleChange} />
      </div>
      <div>
        <label>responsible_name:</label>
        <input type="text" name="responsible_name" onChange={handleChange} />
      </div>
      <div>
        <label>responsible_cpf:</label>
        <input type="number" name="responsible_cpf" onChange={handleChange} />
      </div>
      <div>
        <label>responsible_phone:</label>
        <input type="phone" name="responsible_phone" onChange={handleChange} />
      </div>
      <div>
        <label>responsible_position:</label>
        <input type="text" name="responsible_position" onChange={handleChange} />
      </div>
      
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
