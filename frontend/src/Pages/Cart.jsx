import React, { useEffect } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { CART_API_END_POINT } from '../utils/constant.js';
import {setCartItems} from '../redux/cartSlice.js'

const Cart = () => {
  const {user} = useSelector(store=>store.auth);
  const {cartItems} = useSelector(store=>store.cart);
  console.log(cartItems);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user){
      navigate('/sign-in');
    }

    const fetchCart = async()=>{
      try {
        const res = await axios.get(`${CART_API_END_POINT}/get`,{
          withCredentials : true,
        });

        if(res?.data?.success){
          dispatch(setCartItems(res?.data?.cart));
        }
      } catch (error) {
        console.log(error);        
      }
    };

    fetchCart();
  },[])

  return(
  <>
    
  </>
  )
};
export default Cart;