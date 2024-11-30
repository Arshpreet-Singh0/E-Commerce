import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const USER_API_END_POINT = import.meta.env.VITE_USER_API_END_POINT;
import { setUser } from "../../redux/authSlice";
import Aos from "aos";
import "aos/dist/aos.css";
import { setCartItems } from "../../redux/cartSlice";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";

const SignIn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const next = searchParams.get("next");
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const path = location.pathname;
  const isAdminSignin = path === "/admin/sign-in";

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = input;
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        withCredentials: true,
      });

      // console.log(res);

      if (res?.data?.success) {
        message.success(res?.data?.message);
        dispatch(setUser(res?.data?.user));
        dispatch(setCartItems(res?.data?.cart));

        if (next) navigate(next);
        else navigate("/");
      }
    } catch (error) {
      // console.log(error);
      message.error(error.response?.data?.message || "An error occurred!");
    }
  };
  const handleRoleChange = (e) => {
    setInput((prev) => ({ ...prev, role: e.target.value }));
  };
  const handleclick = () => {
    navigate("/sign-up");
  };

  return (
    <>
      <div className="flex items-center h-[600px]	justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg md:w-1/2 flex flex-col md:flex-row">
          <div className="w-full hidden lg:block" data-aos="fade-left">
            <iframe
              className="w-full h-full"
              src="https://lottie.host/embed/59a0afa1-8c51-4675-bece-2247b6b89beb/SOkDiL958B.json"
            ></iframe>
          </div>
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
              {isAdminSignin && (
                <div className="flex gap-5">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      id="admin"
                      checked={input.role === "admin"}
                      onChange={handleRoleChange}
                    />
                    <label htmlFor="admin" className="ml-2">
                      Admin
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="superadmin"
                      id="superadmin"
                      checked={input.role === "superadmin"}
                      onChange={handleRoleChange}
                    />
                    <label htmlFor="superadmin" className="ml-2">
                      Super Admin
                    </label>
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign In
              </button>
              <div className="h-full text-center w-full">
                New User ?{" "}
                <button className="text-blue-600" onClick={handleclick}>
                  Register Now
                </button>
              </div>
              <div className="h-full text-center w-full">
                Admin Login ?{" "}
                <button
                  className="text-blue-600"
                  onClick={() => navigate("/admin/sign-in")}
                >
                  Admin Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
