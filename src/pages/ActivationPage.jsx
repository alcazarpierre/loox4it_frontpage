import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, {useEffect, useState, useRef} from 'react';
import ActivationMessage from '../components/auth/ActivationMessage';


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
              await axios.post(`${URL}/auth/activate/`, {activationToken}, {withCredentials: true});
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


    if (loading === true) {
      return (
        <div className="flex items-center justify-center w-full h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <p className="text-gray-700 font-medium">Verificando...</p>
          </div>
        </div>
      );
    }
  
    if (error === true) {
      return (
        <ActivationMessage
          message="⚠️ El token ha expirado o no es válido. Intenta registrarte nuevamente."
          delay={5000}
          redirectTo="/sign-up"
        />
      );
    }
  
    return (
      <ActivationMessage
        message="🎉 ¡Tu cuenta fue activada exitosamente! Ya estás listo para vivir la experiencia Loox4it."
        delay={4000}
        redirectTo="/"
      />
    );
  };
export default ActivationPage;