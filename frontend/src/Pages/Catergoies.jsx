import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchPageCard from '../components/SearchPageCard';

function CategoriesPage() {
  const { id } = useParams(); // Extract category id from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/product/get/category/${id}`);
        // console.log("hello",response.data);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching category products:', error);
      }
    };

    if (id) fetchCategoryProducts();
  }, [id]);

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
