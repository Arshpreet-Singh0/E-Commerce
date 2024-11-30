import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Loder from '../components/Loder'; 
import Star from './Star';
const PRODUCT_API_END_POINT = import.meta.env.VITE_PRODUCT_API_END_POINT;

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const apiUrls = {
    Electronics: `${PRODUCT_API_END_POINT}/get/category/Electronics`,
    TVsAppliances: `${PRODUCT_API_END_POINT}/get/category/TVsAppliances`,
    Grocery: `${PRODUCT_API_END_POINT}/get/category/Grocery`,
    Fashion: `${PRODUCT_API_END_POINT}/get/category/Fashion`,
    Beauty: `${PRODUCT_API_END_POINT}/category/Beauty`,
    Furniture: `${PRODUCT_API_END_POINT}/get/category/Furniture`,
  };

  const fetchCategories = async () => {
    try {
      const categoryPromises = Object.keys(apiUrls).map(async (key) => {
        const response = await axios.get(apiUrls[key]);
        return {
          name: key,
          products: response.data.products || [],
        };
      });
      const categoriesData = await Promise.all(categoryPromises);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
    fetchCategories();
  }, []);

  if (loading) {
    return <Loder />;
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const renderCategoryRow = (category) => (
    <div
      key={category.name}
      className="flex flex-col w-full mb-12 bg-gray-100 rounded-2xl p-6 shadow-md"
      data-aos="fade-up"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
        <button
          className="bg-gray-800 text-white px-4 py-2 hover:bg-green-600 rounded-md"
          onClick={() => navigate(`/categories/${category.name}`)}
        >
          More
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {category.products.slice(0, 4).map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => handleProductClick(product._id)}
          >
            <img
              src={product.images[0]?.url || '/path/to/fallback-image.jpg'}
              alt={product.name || 'Product'}
              className="w-full h-48 object-contain rounded-lg mb-4"
            />
            <Star stars={product.ratings} reviews={product.reviews} />
            <h2 className="text-lg font-semibold text-gray-700">{product.name}</h2>
            <p className="text-gray-600 font-medium">&#8377;{product.price}</p>
            <button className="w-full bg-gray-800 text-white px-4 py-2 mt-4 hover:bg-green-600 rounded-md">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full ">
      <h1 className="text-4xl font-bold text-center mb-10">Shop by Categories</h1>
      {categories.map((category) => renderCategoryRow(category))}
    </div>
  );
}

export default Categories;
