import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Badge, Space, Spin } from 'antd';
import cart from '../assets/shopping-cart-6-svgrepo-com.svg';
import { useSelector } from 'react-redux';

function CartLogo() {
  const { user } = useSelector((store) => store.auth);
  const { cartItems, loading } = useSelector((store) => store.cart); // assuming `loading` indicates if cart data is being fetched

  return (
    <Space size="middle">
      <Badge count={user ? cartItems.length : 0} showZero>
        {loading ? (
          <Spin indicator={<ClockCircleOutlined style={{ fontSize: 24 }} spin />} />
        ) : (
          <img className="w-10 h-6 md:w-12 md:h-8" src={cart} alt="cart icon" />
        )}
      </Badge>
    </Space>
  );
}

export default CartLogo;
