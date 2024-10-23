import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { useSelector } from 'react-redux';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('Home');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    closeMenu();
  };

  const {user} = useSelector(store=>store.auth);
  console.log(user);
  

  const navStyles = {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.7rem 2rem',
    overflow: 'hidden',
    zIndex: 1,
    width: '100%',
    opacity:'0.8',
    marginBottom: '20px',
    top: 0,
    borderBottom: '5px solid blue',
    backgroundColor: 'white',
  };

  return (
    <div className="bg-blue-500">
      <nav id='nav' style={navStyles}>
        <Link className="text-3xl font-bold leading-none" to="/" style={{ color: '#0073e6' }}>
          ShopIt
        </Link>
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-blue-600 p-3"
            onClick={toggleMenu}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul
          className={`hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6 ${isMenuOpen ? 'block' : 'hidden'
            }`}
        >
          <li>
            <Link
              to="/"
              className={`text-sm ${activeButton === 'Home' ? 'text-xl text-blue-800 font-bold ' : 'text-gray-400 hover:text-gray-500'
                } transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('Home')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`text-sm ${activeButton === 'About' ? 'text-xl text-blue-800 font-bold' : 'text-gray-400 hover:text-gray-500'
                } transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('About')}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`text-sm ${activeButton === 'Services' ? 'text-xl text-blue-800 font-bold' : 'text-gray-400 hover:text-gray-500'
                } transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('Services')}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`text-sm ${activeButton === 'Pricing' ? 'text-xl text-blue-800 font-bold' : 'text-gray-400 hover:text-gray-500'
                } transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('Pricing')}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`text-sm ${activeButton === 'Contact' ? 'text-xl text-blue-800 font-bold' : 'text-gray-400 hover:text-gray-500'
                } transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('Contact')}
            >
              Help
            </Link>
          </li>
        </ul>
        <Link
          className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200 ease-in-out"
          to="/sign-in"
        >
          Sign In
        </Link>
        <Link
          className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200 ease-in-out"
          to="sign-up"
        >
          Sign Up
        </Link>
      </nav>
      {isMenuOpen && (
        <div className="navbar-menu relative z-50 transition duration-200 ease-in-out">
          <div
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
            onClick={toggleMenu}
          ></div>
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
                  Sign in
                </Link>
                <Link
                  className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl transition duration-200 ease-in-out"
                  to="/sign-up"
                >
                  Sign Up
                </Link>
              </div>
              <p className="my-4 text-xs text-center text-gray-400">
                <span>Copyright © {new Date().getFullYear()}</span>
              </p>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
