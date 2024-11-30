import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchPageCard from '../components/SearchPageCard';
const PRODUCT_API_END_POINT = import.meta.env.VITE_PRODUCT_API_END_POINT;
import Loder from '../components/Loder';

function CategoriesPage() {
  const { id } = useParams(); // Extract category id from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${PRODUCT_API_END_POINT}/get/category/${id}`);
        // console.log("hello",response.data);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching category products:', error);
      }finally{
        setLoading(false);
      }
    };

    if (id) fetchCategoryProducts();
  }, [id]);

  if(loading){
    return <Loder />
  }

  return (
    <div className="flex flex-col gap-5 mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-8 text-center">All {id} Products</h1>
      {
        products?.map((product,idx)=>(
            <SearchPageCard product={product} key={product._id}/>
        ))
    }
    </div>
  );
}

export default CategoriesPage;
