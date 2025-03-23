import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate('/createaccount');
  };

  
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="h-screen flex flex-col justify-end bg-white p-4">
      <div className="text-center max-w-md mx-auto w-full mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to PopX</h1>
        <p className="text-gray-500 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleCreateAccount} 
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
          >
            Create Account
          </button>
          <button
            onClick={handleLogin}
            className="bg-purple-300 hover:bg-purple-400 text-purple-900 font-semibold py-2 px-4 rounded-md transition-all duration-300"
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
}
