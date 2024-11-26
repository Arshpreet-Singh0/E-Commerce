import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { PRODUCT_API_END_POINT } from '../../utils/constant';
import ProductCard from '../../components/admin/ProductCard';
import {Button} from 'antd';
import { useNavigate } from 'react-router';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const getAdminProducts = async()=>{
            try {
                const res = await axios.get(`${PRODUCT_API_END_POINT}/get/admin`, {
                    withCredentials : true
                });
                console.log(res);
                
                if(res?.data?.success){
                    setProducts(res?.data?.products);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getAdminProducts();

    },[]);
    
  return (
    <div className="container mx-auto p-4 mt-4">
      <div className='flex justify-between'>
      <h1 className="text-3xl font-bold mb-8">Listed Products</h1>
      <Button className='py-5' type='primary' onClick={()=>navigate('/admin/product/new')}>List New Product</Button>
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
            products?.map((product,idx)=>(
                <ProductCard product={product} key={product?._id}/>
            ))
        }
    </div>
    </div>
  )
}

export default AdminProducts