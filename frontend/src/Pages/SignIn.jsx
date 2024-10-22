import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";

const SignIn = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation for empty fields
    const { email, password } = input;
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    // API call to authenticate user
    // console.log(input);

    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        withCredentials: true,
      });

      console.log(res);

      if (res?.data?.success) {

        dispatch(setUser(res?.data?.user));
          navigate('/');
      }
    } catch (error) {
     console.log(error);
     
    }

    // After successful sign in, navigate to Home page
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={input.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={handleInputChange}
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
