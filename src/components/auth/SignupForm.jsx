import React, {useState} from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import styles from '../../styles/styles';
import { RxAvatar } from 'react-icons/rx';
import {formsValidation} from '../../utils/formsValidation';


const SignupForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    documentType: 'DNI',
    documentNumber: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const URL = import.meta.env.VITE_API_URL;

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        setAvatar(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFieldErrors({});
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    const validationErrors = formsValidation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setErrorMessage('');
      return;
    }

    try {
      await axios.post(`${URL}/auth/register`, formData);
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError('Hubo un error al registrarte. Intenta de nuevo.');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Regístrate como nuevo Usuario
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            {/* Campos del formulario */}
            {/* Nombres */}
            <div>
              <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>Nombres</label>
              <input
                id='firstName'
                name='firstName'
                type='text'
                value={formData.firstName}
                onChange={handleChange}
                required
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
              {fieldErrors.firstName && <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>}
            </div>

            {/* Apellidos */}
            <div>
              <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>Apellidos</label>
              <input
                id='lastName'
                name='lastName'
                type='text'
                value={formData.lastName}
                onChange={handleChange}
                required
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
              {fieldErrors.lastName && <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>}
            </div>

            {/* Documento */}
            <div>
              <label htmlFor='documentType' className='block text-sm font-medium text-gray-700'>Tipo de Documento</label>
              <select
                id='documentType'
                name='documentType'
                value={formData.documentType}
                onChange={handleChange}
                required
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              >
                <option value='DNI'>DNI</option>
                <option value='CE'>CE</option>
              </select>
              {fieldErrors.documentType && <p className="text-red-500 text-sm">{fieldErrors.documentType}</p>}
            </div>

            <div>
              <label htmlFor='documentNumber' className='block text-sm font-medium text-gray-700'>Número de Documento</label>
              <input
                id='documentNumber'
                name='documentNumber'
                type='text'
                value={formData.documentNumber}
                onChange={handleChange}
                required
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
              {fieldErrors.documentNumber && <p className="text-red-500 text-sm">{fieldErrors.documentNumber}</p>}
            </div>

            {/* Celular */}
            <div>
              <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>Número de Celular</label>
              <input
                id='phone'
                name='phone'
                type='tel'
                pattern='[0-9]{9,11}'
                value={formData.phone}
                onChange={handleChange}
                required
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
              {fieldErrors.phone && <p className="text-red-500 text-sm">{fieldErrors.phone}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Correo electrónico</label>
              <input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
              {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Contraseña</label>
              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10'
                />
                {showPassword ? (
                  <AiOutlineEye className='absolute right-2 top-2 cursor-pointer' onClick={() => setShowPassword(false)} />
                ) : (
                  <AiOutlineEyeInvisible className='absolute right-2 top-2 cursor-pointer' onClick={() => setShowPassword(true)} />
                )}
              </div>
              {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>Confirmar Contraseña</label>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
              {fieldErrors.confirmPassword && <p className="text-red-500 text-sm">{fieldErrors.confirmPassword}</p>}
            </div>

            {/* Avatar */}
            <div>
              <label htmlFor='avatar' className='block text-sm font-medium text-gray-700'>Foto de perfil</label>
              <div className='mt-2 flex items-center'>
                <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                  {formData.avatar ? (
                    <img src={formData.avatar} alt='avatar' className='h-full w-full object-cover rounded-full' />
                  ) : (
                    <RxAvatar className='h-8 w-8' />
                  )}
                </span>
                <label htmlFor='file-input' className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                  <span>Cargar una foto</span>
                  <input
                    id='file-input'
                    name='avatar'
                    type='file'
                    accept='image/*'
                    onChange={handleFileInputChange}
                    className='sr-only'
                  />
                </label>
              </div>
            </div>

            {errorMessage && <p className="text-red-600 text-sm text-center">{errorMessage}</p>}

            <div>
              <button type='submit' className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>Registrarse</button>
            </div>

            <div className={`${styles.normalFlex} w-full`}>
              <h4>¿Ya tienes cuenta?</h4>
              <Link to='/login' className='text-blue-600 pl-2'>Ingresa aquí</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
