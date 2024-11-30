import React, { useEffect } from 'react';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Typography, List, message, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
const CART_API_END_POINT = import.meta.env.VITE_CART_API_END_POINT;
import { setCartItems } from '../redux/cartSlice.js';

const { Text, Title } = Typography;

const Cart = () => {
  const { user } = useSelector((store) => store.auth);
  const { cartItems } = useSelector((store) => store.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(`/sign-in/?next=/cart`);
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get(`${CART_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log(res);
        

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
        withCredentials: true,
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
    navigate(`/buy/${item?._id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title className='text-center' level={2}>Your Cart</Title>
      {cartItems?.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <Row justify="center" gutter={[16, 16]}>
          {cartItems?.map((item) => (
            <Col xs={24} md={20} lg={18} key={item.product}>
              <Card style={{ marginBottom: '16px', width: '100%' }}>
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} sm={6} md={4} style={{ textAlign: 'center' }}>
                    <img src={item?.image} className='w-20 h-20' />
                  </Col>
                  <Col xs={24} sm={12} md={16}>
                    <List.Item.Meta
                      title={<Text strong>{item.name}</Text>}
                      description={<Text>Price: ${item.price}</Text>}
                    />
                  </Col>
                  <Col xs={24} sm={6} md={4} style={{ textAlign: 'center' }}>
                    <Button 
                      type="primary" 
                      icon={<ShoppingCartOutlined />} 
                      onClick={() => buyItem(item)}
                      style={{ marginBottom: '8px', width: '100%' }}
                    >
                      Buy
                    </Button>
                    <Button 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={() => deleteItem(item.product)}
                      style={{ width: '100%' }}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Cart;
