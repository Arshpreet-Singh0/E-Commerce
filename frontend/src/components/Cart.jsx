import React, { useEffect } from 'react';
import { ClockCircleOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Space, Typography, List, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { CART_API_END_POINT } from '../utils/constant.js';
import { setCartItems } from '../redux/cartSlice.js';

const { Text, Title } = Typography;

const Cart = () => {
  const { user } = useSelector((store) => store.auth);
  const { cartItems } = useSelector((store) => store.cart);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if (!user) {
    //   navigate('/sign-in');
    // }

    const fetchCart = async () => {
      try {
        const res = await axios.get(`${CART_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res?.data?.success) {
          dispatch(setCartItems(res?.data?.cart));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [user, dispatch, navigate]);

  const deleteItem = async (itemId) => {
    try {
      const res = await axios.post(`${CART_API_END_POINT}/delete/${itemId}`, {}, {
        withCredentials : true,
      });

      if (res?.data?.success) {
        message.success('Item removed from cart');
        dispatch(setCartItems(res?.data?.cart));
      }
    } catch (error) {
      console.log(error);
      message.error('Failed to remove item');
    }
  };

  const buyItem = (item) => {
    message.success(`Purchased ${item.name}`);
    // Implement buy functionality as needed
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Your Cart</Title>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item) => (
            <Card style={{ marginBottom: '16px' }}>
              <List.Item
                actions={[
                  <Button 
                    type="primary" 
                    icon={<ShoppingCartOutlined />} 
                    onClick={() => buyItem(item)}
                  >
                    Buy
                  </Button>,
                  <Button 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => deleteItem(item.product)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={item.name}
                  description={<Text>Price: ${item.price}</Text>}
                />
              </List.Item>
            </Card>
          )}
        />
      )}
    </div>
  );
};

export default Cart;
