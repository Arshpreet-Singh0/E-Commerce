import React, { useEffect, useState } from "react";
import { Button, Input, InputNumber, Card, Typography, Select, Radio } from "antd";
import { useSelector } from "react-redux";
import DeliverAddressComponenet from "../components/DeliverAddressComponenet";
import OrderSummary from "../components/OrderSummary";
import PriceDetails from "../components/PriceDetails";

const { Text, Title } = Typography;
const { Option } = Select;

const CheckoutPage = () => {
  const { user } = useSelector((store) => store.auth);
  const { buyproduct: product } = useSelector((store) => store.product);

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState(user?.address || null);
  

  useEffect(()=>{
    if(user?.address){
      setAddress(user?.address);
    }
  },[user, user.address])


  return (
    <div className="p-6 lg:flex lg:space-x-6 w-[90%]  lg:w-[80%] mx-auto">
      {/* Left Section */}
      <div className="xl:w-3/4 lg:w-2/3 space-y-6">
        {/* Login Section */}
        <Card className="shadow-md" title="1. Login">
          <div className="flex gap-5 md:gap-10 flex-col md:flex-row">
            <Text>Email : {user?.email}</Text>
            <Text>Phone Number : {user?.phoneNumber}</Text>
            {/* <Button type="link">Change</Button> */}
          </div>
          <p className="mt-4 opacity-50"><span className="text-red-900 ">*</span>Order Confirmation and tracking number will be send on this email</p>
        </Card>

        {/* Delivery Address */}
        <DeliverAddressComponenet address={address} setAddress={setAddress}/>

        {/* Order Summary */}
        <OrderSummary product={product} quantity={quantity} setQuantity={setQuantity}/>
      </div>

      {/* Right Section */}
      <PriceDetails quantity={quantity} product={product} shippingAddress={address}/>
    </div>
  );
};

export default CheckoutPage;
