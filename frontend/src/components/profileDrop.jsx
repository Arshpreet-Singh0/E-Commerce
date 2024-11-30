import React from 'react';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import axios from 'axios';
const USER_API_END_POINT = import.meta.env.VITE_USER_API_END_POINT;
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { setCartItems } from '../redux/cartSlice';
import { useNavigate } from 'react-router';

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async() => {
    // Clear any authentication tokens, local storage, or session data here
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, {
        withCredentials : true,
      });
      
      if(res?.data?.success){
        message.success(res?.data?.message);
        navigate('/')
        dispatch(setUser(null));
        dispatch(setCartItems(null));
      }
      
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };

  const items = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile',
      extra: '⌘P',
    },
    {
      key : '3',
      label : 'My Orders',
      onClick : ()=>navigate('/myorders'),
      extra: '⌘O',
    },
    {
      key: '4',
      label: 'Logout',
      extra: '⌘S',
      onClick: handleLogout, // Attach the logout handler
    },
    {
      key: '5',
      label: 'Settings',
      icon: <SettingOutlined />,
      extra: '⌘S',
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <img
            src={"https://res.cloudinary.com/dxxics5nv/image/upload/v1729768865/qxneinnynlowwbrokxf7.png"}
            alt="Profile"
            className='w-8 h-8'
          />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Profile;
