import React from 'react'
import { Button, Card , Typography, message} from 'antd'
import axios from 'axios';
const ORDER_API_END_POINT = import.meta.env.VITE_ORDER_API_END_POINT;
const PAYMENT_API_END_POINT = import.meta.env.VITE_PAYMENT_API_END_POINT;
const {Text} = Typography;

const PriceDetails = ({quantity, product, shippingAddress,user}) => {

    // payment logic here
    const handleContinueButtonClick = async()=>{
        const amount = product.price * quantity + (quantity*99);
        
        const {data:{key}} = await axios.get(`http://localhost:8080/getkey`);
        const {data:{order}} = await axios.post(`${PAYMENT_API_END_POINT}/checkout`, {amount},{
          withCredentials : true
        });
        //create order with order id
        try {
          const res = await axios.post(`${ORDER_API_END_POINT}/create`,{
            product : product?._id,
            quantity : quantity,
            shippingAddress : shippingAddress,
            totalPrice:amount,
            orderid : order.id,
            name : product?.name,
          },{
            withCredentials : true
          })
          if(!res?.data?.success){
            message.error(res?.data?.message || 'Failed to create order, Try again after some time');
            return;
          }

          const options = {
            "key": key, 
            "amount": order.amount,
            "currency": "INR",
            "name": "ShopIt",
            "description": "Order Transaction",
            "image": "https://res.cloudinary.com/djusmuols/image/upload/Screenshot_2024-11-28_at_10.16.08_AM_gpc3ws.png",
            "order_id": order.id,
            "callback_url": `${PAYMENT_API_END_POINT}/verify`,
            "prefill": {
                "name": user?.name,
                "email": user?.email,
                "contact": user?.phone
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#0349fc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.on("payment.failed", (response) => {
          console.error("Payment failed:", response.error);
          message.error("Payment failed. Please try again.");
        });
        razor.open();
          
        } catch (error) {
          // console.log(error);
          message.error(error?.response?.data?.message || 'An Error Occured');
        }
        

    }
  return (
    <>
    <Card
        className="xl:w-1/4 lg:w-1/3  shadow-md mt-5 lg:mt-0"
        title="Price Details"
        bodyStyle={{ padding: "16px" }}
      >
        <div className="space-y-2">
          <div className="flex justify-between">
            <Text>Price ({quantity} item{quantity > 1 ? "s" : ""})</Text>
            <Text>₹{(product.price * quantity).toLocaleString()}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Delivery Charges</Text>
            <Text className="text-green-600">Free</Text>
          </div>
          <div className="flex justify-between">
            <Text>Packaging Fee (1 item)</Text>
            <Text>₹99</Text>
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between text-lg font-bold">
          <Text>Total Payable</Text>
          <Text>₹{(product.price * quantity + 99*quantity).toLocaleString()}</Text>
        </div>
        <Button type="primary" className="w-full mt-4" onClick={handleContinueButtonClick}>
          Continue
        </Button>
      </Card>
    </>
  )
}

export default PriceDetails