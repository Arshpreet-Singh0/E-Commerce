import React from "react";
import { Card, Button } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

const MyProductComponent = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-[70vh] gap-5 p-5">
      {/* First Product Section */}
      <Card
        className="w-full md:w-1/2 hover:scale-105 transition-transform duration-1000 ease-in-out"
        hoverable
        cover={
          <img
            src="https://i.pinimg.com/originals/51/d3/88/51d38806d50482762c700eca5717a32f.png"
            alt="Electronics"
            className="object-cover h-48 md:h-80 rounded-t-lg"
          />
        }
      >
        <h1 className="text-2xl md:text-4xl font-bold text-black">
          Electronics
        </h1>
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
          className="flex flex-col md:flex-row gap-5 hover:scale-105 transition-transform duration-1000 ease-in-out h-1/2"
          hoverable
          cover={
            <img
              src="https://img.freepik.com/free-photo/portrait-man-doing-household-chores-participating-cleaning-home_23-2151468784.jpg?t=st=1731130748~exp=1731134348~hmac=056aa647b4277d3b6a9fb30355d238b7d3f55a5aa93e7cfbf6338e335495f82d&w=2000"
              className="w-1/3 h-full"
              alt=""
            />
          }
        >
          <div className="">
              <h1 className="text-2xl md:text-4xl font-bold text-black">
                Apparel
              </h1>
              <h2 className="text-sm md:text-lg text-gray-700 mb-4">
                Up to 70% off
              </h2>
              <Button
                type="primary"
                icon={<ShoppingOutlined />}
                className="bg-black text-white hover:bg-green-600"
              >
                Shop Now
              </Button>
              </div>
        </Card>
        {/* Third Product Card */}
        <Card
          className="flex flex-col md:flex-row gap-5 hover:scale-105 transition-transform duration-1000 ease-in-out h-1/2"
          hoverable
          cover={
            <img
              src="https://img.freepik.com/premium-photo/cozy-modern-chair-table-ensemble-neutral-home-setting_1294860-163787.jpg?ga=GA1.1.817693447.1723371409&semt=ais_hybrid"
              className="rounded-md h-full "
              alt=""
            />
          }
        >
          <div className="">
              <h1 className="text-2xl md:text-4xl font-bold text-black">
              Furniture
              </h1>
              <h2 className="text-sm md:text-lg text-gray-700 mb-4">
                Up to 40% off
              </h2>
              <Button
                type="primary"
                icon={<ShoppingOutlined />}
                className="bg-black text-white hover:bg-green-600"
              >
                Shop Now
              </Button>
              </div>
        </Card>
      </div>
    </div>
  );
};

export default MyProductComponent;
