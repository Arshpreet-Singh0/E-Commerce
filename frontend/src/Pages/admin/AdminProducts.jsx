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
    <div>
        {
            products?.map((product,idx)=>(
                <ProductCard product={product}/>
            ))
        }
    </div>
  )
}

export default AdminProducts