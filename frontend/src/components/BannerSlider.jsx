import React from 'react';
import { Carousel } from 'antd';

// Example JSON data containing image URLs and discount text
const bannerData = [
  {
    image: 'https://res.cloudinary.com/dxxics5nv/image/upload/v1729605470/samples/ecommerce/accessories-bag.jpg',
    discount: 'Get 10% Off on All Products!',
  },
  {
    image: 'https://res.cloudinary.com/dxxics5nv/image/upload/v1729605468/samples/ecommerce/analog-classic.jpg',
    discount: 'Save 20% on Your First Purchase!',
  },
  {
    image: 'https://res.cloudinary.com/dxxics5nv/image/upload/v1729605480/cld-sample-5.jpg',
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
  position:'relative',
};

const BannerSlider = () => (
  <div>
    <Carousel style={contentStyle} arrows dotPosition="left" infinite={true} autoplay>
      {bannerData.map((banner, index) => (
        <div key={index} className='relative flex overflow-hidden bg-[red] w-screen h-[500px]'>
          <img 
            src={banner.image} 
            alt="Banner"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
          />
          <div className='absolute bottom-10 right-11 text-xl md:text-3xl'>
            {banner.discount}
          </div>
        </div>
      ))}
    </Carousel>
  </div>
);

export default BannerSlider;
