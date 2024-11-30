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
  margin: 0,
  height: '500px', // Updated height
  color: '#fff',
  lineHeight: '500px', // Updated line height to center text vertically
  textAlign: 'center',
  background: '#364d79',
};

const BannerSlider = () => (
  <div>
    <Carousel style={contentStyle} arrows dotPosition="left" infinite={true} autoplay>
      {bannerData.map((banner, index) => (
        <div key={index} className='relative'>
          <div className='absolute bottom-20 right-16 text-xl md:text-3xl'>
            {banner.discount}
          </div>
        </div>
      ))}
    </Carousel>
  </div>
);

export default BannerSlider;
