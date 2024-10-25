import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import log from '../assets/shopping-basket-svgrepo-com.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice'; // Import the action
import Profile from './profileDrop';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('Home');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    closeMenu();
  };

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch action to set user to null

    console.log(user);
    dispatch(setUser(null));
  };

  const navStyles = {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.7rem 2rem',
    overflow: 'hidden',
    zIndex: 1,
    width: '100%',
    backgroundColor: '#0073e6',
    marginBottom: '20px',
    top: 0,
    borderBottom: '5px solid blue',
  };

  return (
    <div className="bg-blue-500">
      <nav id="nav" style={navStyles}>
        <div className="flex flex-row justify-center align-middle gap-3 text-center">
          <Link className="text-3xl font-bold leading-none mt-1" to="/" style={{ color: '#fff', fontStyle: 'italic' }}>
            ShopIt
          </Link>
          <img className="w-full h-9" src={log} alt="logo" />
        </div>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-blue-600 p-3" onClick={toggleMenu}>
            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className={`hidden lg:flex lg:items-center lg:w-auto lg:space-x-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <li>
            <Link
              to="/"
              className={`text-sm ${activeButton === 'Home' ? 'text-xl text-white font-bold' : 'text-gray-400 hover:text-gray-500'} transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('Home')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`text-sm ${activeButton === 'About' ? 'text-xl text-white font-bold' : 'text-gray-400 hover:text-gray-500'} transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('About')}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`text-sm ${activeButton === 'Services' ? 'text-xl text-white font-bold' : 'text-gray-400 hover:text-gray-500'} transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('Services')}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`text-sm ${activeButton === 'Pricing' ? 'text-xl text-white font-bold' : 'text-gray-400 hover:text-gray-500'} transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('Pricing')}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`text-sm ${activeButton === 'Contact' ? 'text-xl text-white font-bold' : 'text-gray-400 hover:text-gray-500'} transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('Contact')}
            >
              Help
            </Link>
          </li>
        </ul>
        {user ? (
          <div className="flex items-center gap-3">
            <Profile/>
          </div>
        ) : (
          <div>
            <Link
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200 ease-in-out"
              to="/sign-in"
            >
              Sign In
            </Link>
            <Link
              className="hidden lg:inline-block py-2 px-6 bg-[#FF0000] hover:bg-[#FFA27F] text-sm text-white font-bold rounded-xl transition duration-200 ease-in-out"
              to="sign-up"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>

      {isMenuOpen && (
        <div className="navbar-menu relative z-50 transition duration-200 ease-in-out">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" onClick={toggleMenu}></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <Link className="mr-auto text-3xl font-bold leading-none" to="/" style={{ color: '#0073e6' }}>
                ShopIt
              </Link>
              <button className="navbar-close" onClick={toggleMenu}>
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500 transition duration-200 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <nav>
              <ul>
                <li>
                  <Link
                    to="/"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded transition duration-200 ease-in-out"
                    onClick={() => handleButtonClick('Instructors')}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded transition duration-200 ease-in-out"
                    onClick={() => handleButtonClick('Courses')}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accommodations"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded transition duration-200 ease-in-out"
                    onClick={() => handleButtonClick('Accommodations')}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded transition duration-200 ease-in-out"
                    onClick={() => handleButtonClick('Food')}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded transition duration-200 ease-in-out"
                    onClick={() => handleButtonClick('Contact')}
                  >
                    Help
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="mt-auto">
              <div className="pt-6">
                <Link
                  className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl transition duration-200 ease-in-out"
                  to="/sign-in"
                >
                  Sign In
                </Link>
                <Link
                  className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-red-500 hover:bg-red-600 rounded-xl transition duration-200 ease-in-out"
                  to="/sign-up"
                >
                  Sign Up
                </Link>
              </div>
              <p className="my-4 text-xs text-center text-gray-400">
                <span>Copyright © 2024</span>
              </p>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
