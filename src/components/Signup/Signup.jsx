import React, {useState} from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom'
import styles from '../../styles/styles';
import { RxAvatar } from 'react-icons/rx';


const Signup = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
        if(reader.readyState === 2){
            setAvatar(reader.result);
        }
    };
    reader.readAsDataURL(e.target.files[0]);
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
          <form className='space-y-6' >
            <div>
              <label 
                htmlFor='firstName' 
                className='block text-sm font-medium text-gray-700'>
                Nombres
              </label>
              <div className='mt-1'>
                <input 
                  id='firstName' 
                  name='firstName' 
                  type='text' 
                  autoComplete='given-name' 
                  required 
                  value= {firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor='lastName' 
                className='block text-sm font-medium text-gray-700'>
                Apellidos
              </label>
              <div className='mt-1'>
                <input 
                  id='lastName' 
                  name='lastName' 
                  type='text' 
                  autoComplete='family-name' 
                  required 
                  value= {lastName}
                  onChange={e => setLastName(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor='phoneNumber' 
                className='block text-sm font-medium text-gray-700'>
                Número de Celular
              </label>
              <div className='mt-1'>
                <input 
                  id='phone' 
                  name='phone' 
                  type='tel' 
                  autoComplete='tel' 
                  pattern="[0-9]{9,11}"
                  required 
                  value= {phone}
                  onChange={e => setPhone(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor='email' 
                className='block text-sm font-medium text-gray-700'>
                Correo electrónico
              </label>
              <div className='mt-1'>
                <input 
                  id='email' 
                  name='email' 
                  type='email' 
                  autoComplete='email' 
                  required 
                  value= {email}
                  onChange={e => setEmail(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor='password' 
                className='block text-sm font-medium text-gray-700'>
                Contraseña
              </label>
              <div className='mt-1 relative'>
                <input 
                  id='password' 
                  name='password' 
                  type= {showPassword ? 'text' : 'password'}
                  autoComplete='current-password' 
                  required 
                  value= {password}
                  onChange={e => setPassword(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
                />
                {
                  showPassword ? (
                    <AiOutlineEye
                  className='absolute right-2 top-2 cursor-pointer'
                  size={25}
                  onClick={() => setShowPassword(false)}
                />
                  ) : (
                    <AiOutlineEyeInvisible
                  className='absolute right-2 top-2 cursor-pointer'
                  size={25}
                  onClick={() => setShowPassword(true)} 
                  />
                  )
                }
              </div>
            </div>

            <div>
                <label
                  htmlFor='avatar'
                  className='block text-sm font-medium text-gray-700'>   
                </label>
                <div className='mt-2 flex items-center'>
                    <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                        {avatar? (
                            <img 
                            src={avatar} 
                            alt='avatar' 
                            className='h-full w-full object-cover rounded-full'/>
                            ):(
                                <RxAvatar className='h-8 w-8' />
                            )
                        }
                    </span>
                    <label 
                        htmlFor='file-input'
                        className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'  
                    >
                        <span>Cargar una foto</span>  
                        <input 
                        type="file"
                        name='avatar'
                        id='file-input'
                        accept='image/jpg, image/jpeg, image/png'
                        onChange={handleFileInputChange}
                        className='sr-only' 
                        />     
                    </label>
                </div>
            </div>

            <div>
              <button 
                type='submit' 
                className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Registrar
              </button>     
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>¿Ya tienes cuenta?</h4>
              <Link to="/login" 
                className="text-blue-600 pl-2">
                Ingresa
              </Link>
            </div>
          </form> 
        </div>
      </div>
    </div>
  );
}

export default Signup;
