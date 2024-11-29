import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Navbar.css';
import log from '../assets/shopping-basket-svgrepo-com.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice'; // Import the action
import Profile from './profileDrop';
import { Menu, Dropdown, Button, Layout, Avatar, Drawer } from 'antd';
import { UserOutlined, ShoppingOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';

const Navbar = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate()
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    closeMenu();
  };

  const menuItems = (
    <Menu>
      <Menu.Item key="home">
        <Link to="/" onClick={() => handleButtonClick('Home')}>Home</Link>
      </Menu.Item>
      <Menu.Item key="about">
        <Link to="/about" onClick={() => handleButtonClick('About')}>About</Link>
      </Menu.Item>
      <Menu.Item key="contact">
        <Link to="/Contact" onClick={() => handleButtonClick('Contact')}>Contact</Link>
      </Menu.Item>
      <Menu.Item key="help">
        <Link to="/help" onClick={() => handleButtonClick('Help')}>Help</Link>
      </Menu.Item>
    </Menu>
  );

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate('/home')
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

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
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
          <button className="navbar-burger flex items-center text-blue-600 p-3" onClick={toggleDrawer}>
            <svg className="block h-4 w-4 fill-current col-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
              to={user?.role==='admin' ? '/admin/orders' : '/orders'}
              className={`text-sm ${activeButton === 'myorders' ? 'text-xl text-white font-bold' : 'text-gray-400 hover:text-gray-500'} transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('myorders')}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/About"
              className={`text-sm ${activeButton === 'About' ? 'text-xl text-white font-bold' : 'text-gray-400 hover:text-gray-500'} transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('About')}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/Contact"
              className={`text-sm ${activeButton === 'Contact' ? 'text-xl text-white font-bold' : 'text-gray-400 hover:text-gray-500'} transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('Contact')}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/help"
              className={`text-sm ${activeButton === 'Help' ? 'text-xl text-white font-bold' : 'text-gray-400 hover:text-gray-500'} transition duration-200 ease-in-out`}
              onClick={() => handleButtonClick('Help')}
            >
              Help
            </Link>
          </li>
        </ul>
        {user ? (
          <div className="hidden lg:flex items-center gap-3">
            <Profile />
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
              to="/sign-up"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
      {/* Drawer for Mobile Menu */}
      <Drawer
        title={
          <div className="flex justify-between items-center">
            <span>ShopIt</span>
            <Button type="text" icon={<CloseOutlined />} onClick={toggleDrawer} />
          </div>
        }
        placement="right"
        closable={false}
        onClose={toggleDrawer}
        visible={isDrawerVisible}
      >
        <Menu
          mode="vertical"
          selectedKeys={[activeButton]}
          onClick={({ key }) => handleButtonClick(key)}
          className="text-blue-600"
        >
          {menuItems.props.children}
        </Menu>

        <div className="mt-4">
          {user ? (
            <Dropdown overlay={
              <Menu>
                <Menu.Item key="profile">Profile</Menu.Item>
                <Menu.Item key="logout" onClick={handleLogout}>Logout</Menu.Item>
              </Menu>
            }>
              <Button type="text" icon={<UserOutlined />} className="text-blue-600">
                {user.name || 'Profile'}
              </Button>
            </Dropdown>
          ) : (
            <div className="flex space-x-2">
              <Link to="/sign-in">
                <Button type="primary">Sign In</Button>
              </Link>
              <Link to="/sign-up">
                <Button type="danger">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
