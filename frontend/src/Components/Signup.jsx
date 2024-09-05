import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    company_name: '',
    cnpj: '',
    address: '',
    role:'',
    phone1: '',
    phone2: '',
    responsible_name: '',
    responsible_cpf: '',
    responsible_phone: '',
    responsible_position: ''
  });
  const navigate = useNavigate()
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(formData)
  };


  const isFormValid = formData.email.length > 0 &&
                    formData.password.length > 0 &&
                    formData.role.length > 0 &&
                    formData.cnpj.length > 0 &&
                    formData.address.length > 0 &&
                    formData.company_name.length > 0 &&
                    formData.phone1.length > 0;



  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData: ', formData)
    try {
      const response = await axios.post('http://localhost:3001/signup-buyer', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('User created:', response.data);
      navigate('/login')
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-8">
        
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Crie sua conta</h3>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Coloque seu melhor e-mail" 
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="block text-sm font-medium text-gray-700">
            <label required htmlFor="email" className="block text-sm font-medium text-gray-700">Perfil:</label>
              <select className="mt-1 block  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"  name="role" onChange={handleChange} id="">
              <option value="">Selecione ... </option>
              <option value="buyer">Comprador</option>
              <option value="supplier">Vendedor</option>
              </select>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha:</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                required
                placeholder="Coloque uma senha" 
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Nome da Empresa:</label>
              <input 
                type="text" 
                name="company_name" 
                id="company_name" 
                required
                placeholder="Nome da sua empresa" 
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">CNPJ:</label>
              <input 
                type="text" 
                name="cnpj" 
                id="cnpj" 
                required
                placeholder="CNPJ" 
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço:</label>
              <input 
                type="text" 
                name="address" 
                id="address" 
                required
                placeholder="Endereço da sua empresa" 
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            </div>
            
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone1" className="block text-sm font-medium text-gray-700">Telefone 1:</label>
                <input 
                  type="tel" 
                  name="phone1" 
                  id="phone1" 
                  placeholder="Telefone" 
                  required
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="phone2" className="block text-sm font-medium text-gray-700">Telefone 2:</label>
                <input 
                  type="tel" 
                  name="phone2" 
                  id="phone2" 
                  placeholder="Telefone 2 (opcional)" 
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={handleNextStep}
                disabled={!isFormValid}
                className={`${!isFormValid ? 'bg-gray-600' : 'bg-indigo-600' } text-white py-2 px-4 rounded-md shadow  focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                Próximo
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações do responsável</h3>
            <div>
              <label htmlFor="responsible_name" className="block text-sm font-medium text-gray-700">Nome do responsável:</label>
              <input 
                type="text" 
                name="responsible_name" 
                id="responsible_name" 
                placeholder="Nome" 
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="responsible_cpf" className="block text-sm font-medium text-gray-700">CPF do responsável:</label>
              <input 
                type="text" 
                name="responsible_cpf" 
                id="responsible_cpf" 
                placeholder="CPF" 
                required
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="responsible_phone" className="block text-sm font-medium text-gray-700">Telefone do responsável:</label>
                <input 
                  type="tel" 
                  name="responsible_phone" 
                  id="responsible_phone" 
                  placeholder="Telefone" 
                  required
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="responsible_position" className="block text-sm font-medium text-gray-700">Cargo do responsável:</label>
                <input 
                  type="text" 
                  name="responsible_position" 
                  id="responsible_position" 
                  placeholder="Cargo"
                  required
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={handlePreviousStep} 
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Anterior
              </button>
              <button 
                type="submit" 
                className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cadastrar
              </button>
            </div>
          </div>
        )}
      </form>
  );
};

export default Signup;
