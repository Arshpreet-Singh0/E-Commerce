import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Drawer, Button, Dropdown, Avatar } from 'antd';
import { UserOutlined, MenuOutlined, LogoutOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { setUser } from '../redux/authSlice';
import axios from 'axios';

const USER_API_END_POINT = import.meta.env.VITE_USER_API_END_POINT;

const Navbar = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('home');
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const toggleDrawer = () => setIsDrawerVisible(!isDrawerVisible);

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        navigate('/home');
        dispatch(setUser(null));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const menuItems = [
    { key: 'home', label: <Link to="/">Home</Link> },
    { key: 'orders', label: <Link to={user?.role === 'admin' ? '/admin/orders' : '/myorders'}>Orders</Link> },
    { key: 'about', label: <Link to="/about">About</Link> },
    { key: 'contact', label: <Link to="/contact">Contact</Link> },
    { key: 'help', label: <Link to="/help">Help</Link> },
  ];

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="sticky top-0 left-0 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 shadow-md z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-2xl">
          <ShoppingOutlined className="text-3xl" />
          <span>Shop<span className="text-red-500">It</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden w-full lg:flex items-center space-x-6 align-middle justify-center">
          <Menu
            mode="horizontal"
            items={menuItems}
            selectedKeys={[activeKey]}
            onClick={(e) => setActiveKey(e.key)}
            className="bg-transparent text-white w-full justify-center"
            theme="dark"
          />
          {user ? (
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer bg-yellow-300" />
            </Dropdown>
          ) : (
            <>
              <Link to="/sign-in">
                <Button className="bg-white text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button type="primary" className="bg-red-500 hover:bg-red-600 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: '24px', color: 'white' }} />}
          className="lg:hidden"
          onClick={toggleDrawer}
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        open={isDrawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          selectedKeys={[activeKey]}
          onClick={(e) => {
            setActiveKey(e.key);
            setIsDrawerVisible(false);
          }}
          className="bg-transparent text-gray-800"
        />
        <div className="p-4">
          {user ? (
            <Button type="text" icon={<LogoutOutlined />} block onClick={handleLogout} className="text-red-500">
              Logout
            </Button>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button type="default" block href="/sign-in" className="text-blue-500 border-blue-500">
                Sign In
              </Button>
              <Button type="primary" block href="/sign-up" className="bg-yellow-300 text-blue-500">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
