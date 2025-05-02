import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ActivationMessage = ({message, delay = 4000, redirectTo ='/'}) => {
    const navigate = useNavigate();

    useEffect(()=> {
        const timeout = setTimeout(() => {
            navigate(redirectTo);
        }, delay);

        return () => clearTimeout(timeout);
    }, [navigate, delay, redirectTo]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[500px] min-w-[320px] mx-auto">
                <img src="/src/assets/Logo.png" alt="Logo" className="w-20 mb-6 mx-auto" />
                <h1 className="text-2xl font-bold text-primary">{message}</h1>
                <p className="text-sm text-gray-500 mt-2">Redireccionando...</p>
            </div>
        </div>
    );
};

export default ActivationMessage;