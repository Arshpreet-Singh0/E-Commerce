import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const path = location.pathname;
    const isAdminSignup = path==='/admin/sign-up'
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);
  const [input, setInput] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role : isAdminSignup ? "admin" : "",
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    const { email, password, confirmPassword, name, phone } = input;
    if (!email || !password || !confirmPassword || !name || !phone) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/signup`, input, {
        withCredentials: true,
      });
      console.log(res);

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        console.log(res?.data?.success);

        setTimeout(() => {
          navigate("/sign-in");
        }, 800);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "An error occurred!");
    }
};
    const handleRoleChange = (e)=>{
        setInput((prev) =>(
        {...prev, role:e.target.value}
        ));
    }

  return (
    <>
      <ToastContainer position="top-right" />
      <div
        className="flex flex-col lg:flex-row items-center justify-center w-full h-screen bg-gray-100 gap-5 p-6 lg:p-0"
        data-aos="fade-in"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Sign Up
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={input.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={input.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={handleInputChange}
                className="mt-1 block w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none py-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={input.confirmPassword}
                name="confirmPassword"
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
            Already have an account?{" "}
            <button
              onClick={() => navigate("/sign-in")}
              className="text-blue-500 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
        <img
          className="w-full lg:w-1/2 rounded-lg shadow-lg"
          src={isAdminSignup ? 'https://framerusercontent.com/images/03p8SmPBNaVBFUbGHpqciSf8zY.jpeg' : "https://res.cloudinary.com/dowkt7fcc/image/upload/v1729624031/freepik-export-202410221900570zSJ_onuvtr.jpg"}
          alt="Sign Up Visual"
        />
      </div>
    </>
  );
};

export default SignUp;
//   <div className=" mx-auto flex flex-col gap-7 px-4 w-full ">
//         <h1 className="text-3xl font-bold mb-8 text-center">Items</h1>
//         <div className='flex flex-row w-full h-[70vh] gap-5'>
//   {/* First Product Section */}
//   <div className='flex flex-col h-full w-full gap-4 rounded-2xl bg-blueGray-200 hover:scale-105 transition-transform duration-1000 ease-in-out p-5' data-aos="fade-in">
//     <img
//       src=""
//       alt="Electronics"
//       className="w-full h-2/3 object-cover rounded-lg mb-4"
//     />
//     <h1 className='text-4xl text-black font-bold'>Electronics</h1>
//     <h2 className='text-lg text-gray-700 mb-2'>Up to 50% off</h2>
//     <button className='bg-black text-white px-4 py-2 hover:bg-green-600 w-1/4'>
//       Shop Now
//     </button>
//   </div>

//   {/* Second Product Section */}
//   <div className='flex flex-col w-full h-full gap-5 p-2' data-aos="fade-in">
//     <div className='flex flex-row gap-5 h-1/2 rounded-2xl bg-blueGray-200 hover:scale-105 transition-transform duration-1000 ease-in-out p-5'>
//       <div className='flex flex-col ml-5 justify-center gap-5'>
//         <h1 className='text-4xl font-bold text-black'>Apparel</h1>
//         <h2 className='text-lg text-gray-700 mb-2'>Up to 70% off</h2>
//         <button className='bg-black text-white px-4 py-2 hover:bg-green-600'>
//           Shop Now
//         </button>
//       </div>
//       <img/>
//     </div>

//     {/* Third Product Section */}
//     <div className='flex flex-col gap-5 h-1/2 rounded-2xl bg-blueGray-200 hover:scale-105 transition-transform duration-1000 ease-in-out p-5' data-aos="fade-in">
//       <img
//         src="https://example.com/furniture-image.jpg"
//         alt="Furniture"
//         className="w-full h-2/3 object-cover rounded-lg mb-4"
//       />
//       <h1 className='text-4xl text-black font-bold'>Furniture</h1>
//     <h2 className='text-lg text-gray-700 mb-2'>Up to 40% off</h2>
//     <button className='bg-black text-white px-4 py-2 hover:bg-green-600 w-1/4'>
//       Shop Now
//     </button>
//     </div>
//   </div>
// </div>
