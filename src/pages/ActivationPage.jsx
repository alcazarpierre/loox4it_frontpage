import axios from 'axios'
import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom'

const ActivationPage = () => {
    const {activationToken} = useParams();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const hasCalled = useRef(false); //evitar doble llamada en desarrollo

    const URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
      if (!hasCalled.current) {
        const activateAccount = async () => {
          try {
              await axios.post(`${URL}/auth/activate/`, {activationToken});
              setError(false);

          } catch (error) {
              setError(true);
              
          } finally {
              setLoading(false);
          }
        };

        activateAccount();
        hasCalled.current = true;
      }
    }, [activationToken, URL]);


  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        {loading ? (
          <p className="text-gray-700 font-medium">Verificando...</p>
        ) : error ? (
          <p className="text-red-600 font-semibold">¡El token ha expirado o no es válido!</p>
        ) : (
          <p className="text-green-600 font-semibold">¡Tu cuenta fue activada exitosamente!</p>
        )}
      </div>
    </div>
  );
};

export default ActivationPage