import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { PRODUCT_API_END_POINT } from '../../utils/constant';
import ProductCard from '../../components/admin/ProductCard';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Listed Products</h1>
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