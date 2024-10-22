import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Aos from 'aos';
import 'aos/dist/aos.css';
const SignUp = () => {
    useEffect(() => {
    Aos.init({ duration: 3000 });
  },[]);
    const [input, setInput] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
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
        const { email, password, confirmPassword, name, phone } = input;
        if (!email || !password || !confirmPassword || !name || !phone) {
            setError('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        console.log(input);
        // Add your sign-up logic here, e.g., API calls
        // navigate('/'); // Redirect after successful sign-up
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row items-center justify-center w-full h-screen bg-gray-100 gap-5 p-6 lg:p-0" data-aos="fade-in">
                
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                id='name'
                                type="text"
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
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                id='phone'
                                type="text"
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
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account?{' '}
                        <button 
                            onClick={() => navigate('/sign-in')} 
                            className="text-blue-500 hover:underline"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
                <img 
                    className="w-full lg:w-1/2 rounded-lg shadow-lg" 
                    src='https://res.cloudinary.com/dowkt7fcc/image/upload/v1729624031/freepik-export-202410221900570zSJ_onuvtr.jpg' 
                    alt="Sign Up Visual" 
                />
            </div>
        </>
    );
};

export default SignUp;
  