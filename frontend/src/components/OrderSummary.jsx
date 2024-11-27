import React from 'react'
import { Button, Card, InputNumber, Typography } from 'antd';
import Title from 'antd/es/skeleton/Title'
import QuantitySelector from './Quantity';
const {Text} = Typography;

const OrderSummary = ({product, quantity, setQuantity}) => {
    
  return (
    <>
    <Card className="shadow-md" title="3. Order Summary">
          <div className="flex lg:items-center space-x-4 flex-col lg:flex-row">
            <img
              src={product?.images[0]?.url}
              alt={product?.name}
              className="w-24 h-24 rounded-md object-cover"
            />
            <div>
              <Title level={5}>{product.name}</Title>
              <Text type="secondary">Seller: SuperComNet</Text>
              <div className="flex md:items-center mt-2 flex-col md:flex-row">
                <Text className="text-lg font-bold text-green-600">
                  ₹{product.price.toLocaleString()}
                </Text>
                <div className="flex items-center space-x-2">
                  <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>
                  {/* <Button type="link" danger>
                    Remove
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </Card>
    </>
  )
}

export default OrderSummary