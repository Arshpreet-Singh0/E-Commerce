import React, { useState } from "react";
import { Button } from "antd";
import "antd/dist/reset.css"; // Ant Design reset styles

const QuantitySelector = ({quantity, setQuantity}) => {
  

  const handleIncrement = () => {
    if(quantity<10){
        setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center space-x-4 mt-4 mb-4 md:ml-5">
      <Button 
        // type="primary" 
        danger 
        onClick={handleDecrement} 
        className="text-lg flex items-center justify-center w-10 h-10"
      >
        -
      </Button>

      <div className="w-12 text-center text-xl font-semibold bg-gray-200 rounded-md py-2">
        {quantity}
      </div>

      <Button 
        // type="primary" 
        color="default" variant="outlined"
        onClick={handleIncrement} 
        className="text-lg flex items-center justify-center w-10 h-10"
      >
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;
