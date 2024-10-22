import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const SignUp = () => {
     const [input, setInput] = useState({
          email : "",
          name : "",
          phone : "",
          password : "",
          confirmPassword : "",
     })
     const [error, setError] = useState('');
     const navigate = useNavigate();
     const handleInputChange = (e) => {
          setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }));
        };

     const handleSubmit = (e) => {
          setError('');
          e.preventDefault();
          // Simple validation for empty fields and password match
          const {email, password, confirmPassword,  name, phone} = input;
          if (!email || !password || !confirmPassword) {
               setError('Please fill in all fields');
               return;
          }
          if (password !== confirmPassword) {
               setError('Passwords do not match');
               return;
          }

          console.log(input);
          

          // setError('');
          // Add actual sign-up logic here
          // Example: Redirect to home page or show success message
          // navigate('/');
     };

     return (
          <>
               <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>
                         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                         <form onSubmit={handleSubmit} className="space-y-4">
                              
                              <div>
                                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                   <input
                                        id='name'
                                        type="name"
                                        name='name'
                                        placeholder="Name"
                                        value={input.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                                        required
                                   />
                              </div>
                              <div>
                                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                   <input
                                        id='email'
                                        type="email"
                                        name='email'
                                        placeholder="Email"
                                        value={input.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                                        required
                                   />
                              </div>
                              <div>
                                   <label htmlFor="number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                   <input
                                        id='number'
                                        type="number"
                                        name='phone'
                                        placeholder="Phone Number"
                                        value={input.phone}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                                        required
                                   />
                              </div>
                              <div>
                                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                   <input
                                        id='password'
                                        type="password"
                                        name='password'
                                        placeholder="Password"
                                        value={input.password}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                                        required
                                   />
                              </div>
                              <div>
                                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                   <input
                                        id='confirmPassword'
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={input.confirmPassword}
                                        name='confirmPassword'
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                                        required
                                   />
                              </div>
                              <button
                                   type="submit"
                                   className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                              >
                                   Sign Up
                              </button>
                         </form>
                    </div>
               </div>
          </>
     );
};

export default SignUp;
