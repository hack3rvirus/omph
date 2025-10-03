import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface FormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const success = await login(data.username, data.password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      alert('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beigeBg">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="font-heading text-3xl text-center text-navyBlue mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-darkText">Username</label>
            <input
              type="text"
              id="username"
              {...register('username', { required: 'Username is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navyBlue focus:border-navyBlue"
            />
            {errors.username && <p className="mt-1 text-sm text-liturgicalRed">{errors.username.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-darkText">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navyBlue focus:border-navyBlue"
            />
            {errors.password && <p className="mt-1 text-sm text-liturgicalRed">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-navyBlue text-white py-2 px-4 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navyBlue transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
