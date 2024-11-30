import React from 'react';
import { Carousel } from 'antd';

// Example JSON data containing image URLs and discount text
const bannerData = [
  {
    image: 'https://via.placeholder.com/1200x500?text=Discount+10%',
    discount: 'Get 10% Off on All Products!',
  },
  {
    image: 'https://via.placeholder.com/1200x500?text=Discount+20%',
    discount: 'Save 20% on Your First Purchase!',
  },
  {
    image: 'https://via.placeholder.com/1200x500?text=Discount+30%',
    discount: 'Exclusive 30% Discount for Limited Time!',
  },
  {
    image: 'https://via.placeholder.com/1200x500?text=Discount+50%',
    discount: 'Hurry! 50% Off on Selected Items!',
  },
];

const contentStyle = {
  width: '100%',
  height: '400px', // Reduced height for a more compact banner
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#364d79',
  overflow: 'hidden',
};


const BannerSlider = () => (
  <div>
    <Carousel dotPosition="top" autoplay style={contentStyle} arrows>
      <div >
        <img
          src="https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-119090.jpg?t=st=1731129344~exp=1731132944~hmac=02a494d8e1e48245e7423cd12e0d5a8c7c48afcb35d451d07ffbbc27c0da862c&w=2000"
          alt="Banner 1"
          className="object-cover w-full h-full"
        />
      </div>
      <div >
        <img
          src="https://img.freepik.com/free-photo/excited-girl-scream-joy-making-fist-pump-holding-shopping-bag-rejoicing-standing-dress-ove_1258-120529.jpg?t=st=1731129790~exp=1731133390~hmac=86e41a314c75ae74b853ac1fe255de6225b6c69f6be4a8545d2441330bbd8062&w=2000"
          alt="Banner 2"
          className="object-cover w-full h-full"
        />
      </div>
    </Carousel>
  </div>
);

export default BannerSlider;
 