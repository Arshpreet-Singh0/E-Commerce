import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";
import { toast, ToastContainer } from "react-toastify";
import Aos from 'aos';
import 'aos/dist/aos.css';
const SignIn = () => {
 // const navigate = useNavigate();
useEffect(() => {
    Aos.init({ duration: 3000 });
  },[]);
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
        console.log(res?.data?.message);
        
        toast.success(res?.data?.message);
        dispatch(setUser(res?.data?.user));
        navigate('/');
      }
    } catch (error) {
      console.log(error);

    }

    // After successful sign in, navigate to Home page
  };
  const handleclick = ()=>{
    navigate('/sign-up');
  }

  return (
    <>
        <ToastContainer position="top-right" />
      <div className="flex items-center h-[600px]	justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 flex flex-col md:flex-row">
         <div className="w-full" data-aos='fade-left'><iframe className="w-full h-full" src="https://lottie.host/embed/59a0afa1-8c51-4675-bece-2247b6b89beb/SOkDiL958B.json"></iframe></div>
        <div className="w-full" data-aos="fade-right">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6 ">
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
            <div className="h-full text-center w-full">New User ? <button className="text-blue-600" onClick={handleclick}>Register Now</button></div>
          </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default SignIn;
