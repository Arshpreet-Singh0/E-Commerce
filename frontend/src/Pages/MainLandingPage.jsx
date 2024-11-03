import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BannerSlider from '../components/BannerSlider';

import Aos from 'aos';
import 'aos/dist/aos.css';
import Category from '../../../backend/models/category.model';
import Categories from '../components/categories';
import { useSelector, useDispatch } from 'react-redux';
function MainLandingPage() {
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    Aos.init({ duration: 3000 });
    if (user) {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${CART_API_END_POINT}/get`, {
          withCredentials: true,
        });
        
        if (res?.data?.success) {
          console.log(res)
          dispatch(setCartItems(res?.data?.cart));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }
  }, [user]);

  return (
    <div className="flex flex-col flex-grow w-full">
      <div className="" data-aos="fade-out"><BannerSlider/></div>
      <div className=" mx-auto flex flex-col gap-7 px-4 w-full ">
        <h1 className="text-3xl font-bold mb-8 text-center">Items</h1>
        <div className='flex flex-row w-full h-[70vh] gap-5'>
  {/* First Product Section */}
  <div className='flex flex-col h-full w-full gap-4 rounded-2xl bg-blueGray-200 hover:scale-105 transition-transform duration-1000 ease-in-out p-5' data-aos="fade-in">
    <img 
      src=""
      alt="Electronics" 
      className="w-full h-2/3 object-cover rounded-lg mb-4"
    />
    <h1 className='text-4xl text-black font-bold'>Electronics</h1>
    <h2 className='text-lg text-gray-700 mb-2'>Up to 50% off</h2>
    <button className='bg-black text-white px-4 py-2 hover:bg-green-600 w-1/4'>
      Shop Now
    </button>
  </div>

  {/* Second Product Section */}
  <div className='flex flex-col w-full h-full gap-5 p-2' data-aos="fade-in">
    <div className='flex flex-row gap-5 h-1/2 rounded-2xl bg-blueGray-200 hover:scale-105 transition-transform duration-1000 ease-in-out p-5'>
      <div className='flex flex-col ml-5 justify-center gap-5'>
        <h1 className='text-4xl font-bold text-black'>Apparel</h1>
        <h2 className='text-lg text-gray-700 mb-2'>Up to 70% off</h2>
        <button className='bg-black text-white px-4 py-2 hover:bg-green-600'>
          Shop Now
        </button>
      </div>
      <img/>
    </div>

    {/* Third Product Section */}
    <div className='flex flex-col gap-5 h-1/2 rounded-2xl bg-blueGray-200 hover:scale-105 transition-transform duration-1000 ease-in-out p-5' data-aos="fade-in">
      <img 
        src="https://example.com/furniture-image.jpg" 
        alt="Furniture" 
        className="w-full h-2/3 object-cover rounded-lg mb-4"
      />
      <h1 className='text-4xl text-black font-bold'>Furniture</h1>
    <h2 className='text-lg text-gray-700 mb-2'>Up to 40% off</h2>
    <button className='bg-black text-white px-4 py-2 hover:bg-green-600 w-1/4'>
      Shop Now
    </button>
    </div>
  </div>
</div>

        <div className='p-6' data-aos="zoom-in">
         <Categories/>
        </div>
      </div>
    </div>
  );
}

export default MainLandingPage;
