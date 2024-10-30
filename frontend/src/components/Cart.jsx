import React, { useEffect } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { CART_API_END_POINT } from '../utils/constant';
import {setCartItems} from '../redux/cartSlice.js'
import { Link } from 'react-router-dom';

const App = () => {
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

  return (
    <div className='flex justify-center'>
      <div className='w-[80%] '>
      {
        cartItems && cartItems.length!=0 ? 
        <>
          {
            cartItems.map((item, index)=>(
              <Link to={`/product/${item.product}`}>
              <div key={item._id} className='flex h-56 p-2'>
                <div>
                  <img src={item.image} alt="" className='w-44 h-full object-contain rounded-lg' />
                </div>
                <div className='flex-1 border border-black p-2'>
                    <h1 className='text-xl font-bold'>{item?.name}</h1>
                    <p className='text-lg'>Quantity : {item?.quantity}</p>
                </div>
              </div></Link>
            ))
          }
        </> : (
          <p>No items in cart.</p>
        )
      }
      </div>
    </div>
  // <Space size="middle">
  //   <Badge count={5}>
  //     <Avatar shape="square" size="large" />
  //   </Badge>
  //   <Badge count={0} showZero>
  //     <Avatar shape="square" size="large" />
  //   </Badge>
  //   <Badge
  //     count={
  //       <ClockCircleOutlined
  //         style={{
  //           color: '#f5222d',
  //         }}
  //       />
  //     }
  //   >
  //     <Avatar shape="square" size="large" />
  //   </Badge>
  // </Space>
  )
};
export default App;