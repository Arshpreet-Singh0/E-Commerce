import React from 'react';
import { Card, Button } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';

const MyProductComponent = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-[70vh] gap-5 p-5">
      {/* First Product Section */}
      <Card
        className="w-full md:w-1/2 hover:scale-105 transition-transform duration-1000 ease-in-out"
        hoverable
        cover={
          <img
            src=""
            alt="Electronics"
            className="object-cover h-48 md:h-2/3 rounded-t-lg"
          />
        }
      >
        <h1 className="text-2xl md:text-4xl font-bold text-black">Electronics</h1>
        <h2 className="text-sm md:text-lg text-gray-700 mb-4">Up to 50% off</h2>
        <Button
          type="primary"
          icon={<ShoppingOutlined />}
          className="bg-black text-white hover:bg-green-600"
        >
          Shop Now
        </Button>
      </Card>

      {/* Second Product Section */}
      <div className="flex flex-col w-full md:w-1/2 gap-5">
        {/* Second Product Card */}
        <Card
          className="flex flex-col md:flex-row gap-5 hover:scale-105 transition-transform duration-1000 ease-in-out"
          hoverable
        >
          <div className="flex flex-col justify-center gap-2 md:gap-5 w-full md:w-2/3">
            <h1 className="text-2xl md:text-4xl font-bold text-black">Apparel</h1>
            <h2 className="text-sm md:text-lg text-gray-700 mb-4">Up to 70% off</h2>
            <Button
              type="primary"
              icon={<ShoppingOutlined />}
              className="bg-black text-white hover:bg-green-600"
            >
              Shop Now
            </Button>
          </div>
          <img
            src=""
            alt="Apparel"
            className="w-full md:w-1/3 h-32 md:h-full object-cover rounded-lg"
          />
        </Card>

        {/* Third Product Card */}
        <Card
          className="flex flex-col gap-5 hover:scale-105 transition-transform duration-1000 ease-in-out"
          hoverable
          cover={
            <img
              src="https://example.com/furniture-image.jpg"
              alt="Furniture"
              className="object-cover h-32 md:h-2/3 rounded-t-lg"
            />
          }
        >
          <h1 className="text-2xl md:text-4xl font-bold text-black">Furniture</h1>
          <h2 className="text-sm md:text-lg text-gray-700 mb-4">Up to 40% off</h2>
          <Button
            type="primary"
            icon={<ShoppingOutlined />}
            className="bg-black text-white hover:bg-green-600"
          >
            Shop Now
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default MyProductComponent;
