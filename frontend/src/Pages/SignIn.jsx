import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();  // Hook for navigation

     const handleSubmit = () => {
          // Simple validation for empty fields
          if (!email || !password) {
               setError('Please fill in all fields');
               return;
          }
          // After successful sign in, navigate to Home page
          navigate('/');
     };

     return (
          <>
               <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign In</h1>
                         <form onSubmit={handleSubmit} className="space-y-4">
                              <div>
                                   <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                                   <input
                                        id='email'
                                        type="email"
                                        name='email'
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                                        required
                                   />
                              </div>
                              <div>
                                   <label htmlFor="password" className="font-medium text-gray-700">Password</label>
                                   <input
                                        id='password'
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-700 focus:outline-none py-2"
                                        required
                                   />
                              </div>
                              <button
                                   type="submit"
                                   className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                              >
                                   Sign In
                              </button>
                         </form>
                    </div>
               </div>
          </>
     );
};

export default SignIn;
