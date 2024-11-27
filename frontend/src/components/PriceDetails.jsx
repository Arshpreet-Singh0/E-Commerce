import React from 'react'
import { Button, Card , Typography} from 'antd'
const {Text} = Typography;

const PriceDetails = ({quantity, product, shippingAddress}) => {

    // payment logic here
    const handleContinueButtonClick = ()=>{
        console.log(product);
        console.log(quantity);
        console.log('price : ', product.price * quantity);
        console.log(shippingAddress);
          
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