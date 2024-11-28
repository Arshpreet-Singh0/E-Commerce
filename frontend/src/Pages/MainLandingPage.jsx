import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BannerSlider from '../components/BannerSlider';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Category from '../../../backend/models/category.model';
import Categories from '../components/categories';
import { useSelector, useDispatch } from 'react-redux';
import MyProductComponent from '../components/ProductSection';
import { useNavigate } from 'react-router';
function MainLandingPage() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 3000 });

    // console.log(user);
    
    if(user && user?.role=='admin'){
      navigate('/admin');
    }
  }, [user]);

  return (
    <div className="flex flex-col flex-grow w-full">
      <div className="" data-aos="fade-out"><BannerSlider/></div>
      <div className=" mx-auto flex flex-col gap-7 px-4 w-full ">
        <h1 className="text-3xl font-bold mb-8 text-center">Items</h1>
        <MyProductComponent/>

        <div className='p-6'>
         <Categories/>
        </div>
      </div>
    </div>
  );
}

export default MainLandingPage;
