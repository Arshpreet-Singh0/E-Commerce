import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, message, Modal, Select, Typography } from "antd";
import { useNavigate } from "react-router";
import axios from "axios";
import { ORDER_API_END_POINT } from "../utils/constant";
const { Text, Title } = Typography;

const OrderCard = ({ order, admin}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    trackingNumber : "",
    courierService : "",
    status : "",
  })
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async() => {
    if(!input.trackingNumber && !input.courierService && !input.status){
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${ORDER_API_END_POINT}/update/${order?._id}`,input,{
        withCredentials : true,
      });
      console.log(res);
      
      if(res?.data?.success){
        message.success(res?.data?.message);
        setIsModalOpen(false);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log(error);
    }finally{
      setLoading(false);
    }
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlechange = (e)=>{
    
    setInput({...input, [e.target.name]: e.target.value});
  }
  const handleStatuschange = (value)=>{
    setInput((prev) => ({ ...prev, status: value }));
  }

  useEffect(() => {
    if (order) {
      setInput((prevInput) => ({
        ...prevInput,
        trackingNumber: order.trackingNumber,
        courierService: order.courierService,
        status: order.status,
      }));
    }
    
  }, [order]);
  console.log(input);
    
  return (
    <div className="w-[95%] lg:w-[90%] xl:w-[80%] mx-auto ">
      <Card className="shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-start">
          <div className="flex justify-center lg:w-1/4">
            <img
              src={order?.product?.images?.[0]?.url}
              alt={order?.product?.name}
              className="h-48"
            />
          </div>
          <div className="flex flex-col sm:flex-row lg:w-1/2 justify-between mt-4 lg:mt-0">
            <div className="p-3 lg:w-1/2">
                <Text className="text-xl font-bold text-[#0173E5] hover:text-black">
                {order?.product?.name}
                </Text>
                <div className="mt-3">
                    <Text>Order ID: {order?.orderid}</Text> <br />
                    <Text>Tracking number: {order?.trackingNumber ? order.trackingNumber : 'N/A'}</Text> <br />
                    {
                      admin ? (
                        <Button type="primary" className="mt-4" onClick={showModal}>Actions</Button>
                      ) : (
                        <Button type="primary" className="mt-4" onClick={()=>navigate(`/product/${order?.product?._id}`)}>Buy Again</Button>
                      )
                    }
                    
                </div>
            </div>
            <div className="lg:w-1/2 p-3">
            <Title level={5}>Shipping Address</Title>
            <Text>{order?.shippingAddress?.name}</Text> <br />
                <Text>{order?.shippingAddress?.phone}</Text> <br />
                <Text>{order?.shippingAddress?.street}, </Text>
                <Text> {order?.shippingAddress?.city}, </Text>
                <Text> {order?.shippingAddress?.pincode}, </Text>
                <Text> {order?.shippingAddress?.country} </Text> <br />
                <Text>LandMark : {order?.shippingAddress?.landmark} </Text>
            </div>

          </div>


          <div className=" w-full mt-2 lg:w-1/4 lg:mt-0">
            <Title level={5}>Order Information : </Title>
            <div className="flex items-center justify-between lg:block">
              <div>
                <div className="pt-3 mb-1">
                  <Text className="text-lg text-[#0173E5] font-bold">
                    Order Value :{" "}
                  </Text>
                  <Text className="text-xl font-bold">
                    &#8377; {order?.totalPrice}
                  </Text>{" "}
                  <br />
                </div>
                <div className="mb-1">
                  <Text className="text-[#0173E5] text-lg font-bold">
                    Quantity :{" "}
                  </Text>
                  <Text className="text-xl">{order?.quantity}</Text> <br />
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <Text className="text-[#ee565b] text-lg font-bold">
                    Status :{" "}
                  </Text>
                  <Text className="text-lg">{order?.status}</Text> <br />
                </div>
                <div className="">
                  <Text className="text-[#ee565b] text-lg font-bold">
                    Payment Status :{" "}
                  </Text>
                  <Text className="text-lg">
                    {order?.paymentstatus == "confirmed"
                      ? "Paid"
                      : "Transaction Failed"}
                  </Text>{" "}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form layout="vertical">
          <Form.Item
            label="Tracking Number (if available)"
            name="trackingNumber"
          >
            <Input placeholder="Tracking Number" name="trackingNumber" onChange={handlechange} value={input.trackingNumber} className="rounded-md"/>
          </Form.Item>
          <Form.Item
            label="Courier Service"
            name="courierService"
          >
            <Input placeholder="Courier Service" name="courierService" onChange={handlechange} value={input.courierService} className="rounded-md"/>
          </Form.Item>
          <Form.Item
            label="Status"
          >
            <Select placeholder="Select Status" onChange={handleStatuschange} value={input.status}>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="confirmed">Confirmed</Select.Option>
              <Select.Option value="dispatched">Dispatched</Select.Option>
              <Select.Option value="delivered">Delivered</Select.Option>
              <Select.Option value="cancelled">Cancelled</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderCard;
