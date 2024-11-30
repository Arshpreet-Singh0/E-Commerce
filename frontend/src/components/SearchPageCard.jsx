import { Card, Typography } from 'antd';
const {Text, Title} = Typography;
import React from 'react'
import { useNavigate } from 'react-router';
import Star from './Star.jsx';

const SearchPageCard = ({product}) => {
  const navigate = useNavigate();
  // console.log(product);
  
  return (
    <div className='w-[95%] md:w-[70%] mx-auto '>
      <Card className="shadow-md" onClick={()=>navigate(`/product/${product?._id}`)}>
        <div className='flex flex-col lg:flex-row items-center md:items-start'>
          <div className='flex justify-center lg:w-1/4 w-full'>
            <img src={product?.images?.[0]?.url} alt={product?.name} className='h-48'/>
          </div>
          <div className='flex justify-center lg:block lg:w-3/4 w-full'>
          <div className='p-3 md:w-1/2'>
            <Text className='text-xl font-bold text-[#0173E5] hover:text-black'>{product?.name}</Text>
            <div className='mt-3'>
            <Star stars={product?.rating}/>
            </div>
            <div className='mt-5'>
              <Text>{product?.description}</Text>
            </div>
          </div>

          <div className='md:w-1/4 pt-3'>
            <Title level={3}>&#8377; {product?.price}</Title>
            <Text><span className='line-through'>{product?.price + product?.price/10}</span> <span className='text-green-600'>10% off</span></Text> <br />
            <Text className='text-green-500 font-bold'>Save Extra with combo offers</Text>
          </div>

          </div>

        </div>
      </Card>
    </div>
  )
}

export default SearchPageCard