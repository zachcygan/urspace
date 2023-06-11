import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';
import { useDispatch,useSelector } from 'react-redux';
import {showNotification} from '../redux/features/notificationSlice';
import { Link } from 'react-router-dom';
const LoginForm = () => {
  const dispatch = useDispatch();
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(userFormData)

    try {
      const response = await loginUser({
        variables: userFormData
      });

      if(response.data.login.errors){
        throw new Error('Something went wrong!');
      }

      const { token, user } = await response.data.login;
      console.log(token, user);
      Auth.login(token);

      dispatch(showNotification({
        message: 'Login successful!',
        type: 'success'
      }));
      localStorage.setItem('notification',JSON.stringify({message: 'Login successful!',
      type: 'success'}));
    } catch (err) {
      console.error(err);
      setShowAlert(true);

      dispatch(showNotification({
        message: 'Login failed!, incorrect username or password',
        type: 'error'
      }));
      localStorage.setItem('notification',JSON.stringify({message: 'Login failed!, incorrect username or password', type: 'error'}));
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" >
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <h3 className={`text-red-500 ${showAlert ? 'block' : 'hidden'}`}>Username or password is incorrect</h3>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="email" onChange={handleInputChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" autoComplete="current-password" onChange={handleInputChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
            </div>
          </div>

          <div className='flex justify-center'>
            <button type="submit"  className="flex-col justify-center rounded-md bg-indigo-600 mr-2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            <Link to='register'>
            <button type="submit" className="flex-col justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
            </Link>
            
          </div>
        </form>
      </div>
    </div>

  )
};


export default LoginForm;