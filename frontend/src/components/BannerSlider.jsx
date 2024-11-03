import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  margin: 0,
  height: '300px', // Updated height
  color: '#fff',
  lineHeight: '300px', // Updated line height to center text vertically
  textAlign: 'center',
  background: '#364d79',
};
const contentStyle2 = {
  margin: 0,
  height: '300px', // Updated height
  color: '#fff',
  lineHeight: '300px', // Updated line height to center text vertically
  textAlign: 'center',
  background: '#364d79',
};

const BannerSlider = () => (
  <div>
    <Carousel style={contentStyle} arrows dotPosition="left" infinite={true} autoplay>
      <div></div>
      <div></div>
    </Carousel>
  </div>
);

export default BannerSlider;
 