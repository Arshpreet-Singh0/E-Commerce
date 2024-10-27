import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CategoriesPage() {
  const { categoryName } = useParams(); // Extract category name from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/product/get/category/${categoryName}`);
        console.log("hello",response.data);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching category products:', error);
      }
    };

    if (categoryName) fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">{categoryName} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md">
            <img src={product.images[0].url} alt={product.name} className="w-full h-32 object-contain rounded-md mb-2" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
