import React from 'react';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleLogout = async() => {
    // Clear any authentication tokens, local storage, or session data here
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, {
        withCredentials : true,
      })
  
      if(res?.data?.success){
        dispatch(setUser(null));
      }
      
    } catch (error) {
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
      key: '3',
      label: 'Billing',
      extra: '⌘B',
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
            src={user?.profilePhoto || "https://res.cloudinary.com/dxxics5nv/image/upload/v1729768865/qxneinnynlowwbrokxf7.png"}
            alt="Profile"
            className='w-8 h-8'
          />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Profile;
