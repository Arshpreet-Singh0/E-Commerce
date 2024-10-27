import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Loder from '../components/Loder'; 
import Star from './Star';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const apiUrls = {
    Electronics: 'http://localhost:8080/api/v1/product/get/category/67135c0d050b49202e0c81c5',
    TVsAppliances: 'http://localhost:8080/api/v1/product/get/category/67161d29b14c947dc6a64029',
    Grocery: 'http://localhost:8080/api/v1/product/get/category/67135d1d050b49202e0c81cb',
    Fashion: 'http://localhost:8080/api/v1/product/get/category/67162393b02279f37dbed5b0',
    Beauty: 'http://localhost:8080/api/v1/product/get/category/671623afb02279f37dbed5b3',
    Furniture: 'http://localhost:8080/api/v1/product/get/category/671623f1b02279f37dbed5b6',
    HomeKitchen: 'http://localhost:8080/api/v1/product/get/category/67162461b02279f37dbed5ba',
  };

  const fetchCategories = async () => {
    try {
      const categoryPromises = Object.keys(apiUrls).map(async (key) => {
        const response = await axios.get(apiUrls[key]);
        console.log(response.data)
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

  // Handle product click to navigate to the product detail page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const renderCategoryRow = (category) => {
    return (
      <div
        key={category.name}
        className="flex flex-col w-full mb-8 bg-blueGray-500 rounded-2xl p-5"
        data-aos="fade-up"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-black">{category.name}</h1>
          <button
            className="bg-black text-white px-4 py-2 hover:bg-green-600"
            onClick={() => navigate(`/categories/${category._id}`)} // Navigate to Categories page with category name
          >
            More
          </button>
        </div>

        <div className="container relative flex overflow-auto scroll-snap-x-mandatory">
          {category.products.map((product) => (
            <div
              onClick={() => handleProductClick(product._id)} 
              key={product._id}
              className="box flex-shrink-0 w-full sm:w-1/2 md:w-full lg:w-1/4 h-auto bg-white rounded-lg shadow-md scroll-snap-start p-4"
            >
              <img
                src={product.images[0].url || '/path/to/fallback-image.jpg'}
                alt={product.name || 'Product'}
                className="w-full h-32 object-contain rounded-lg mb-2"
              />
              <Star stars={product.ratings} reviews={product.reviews}/>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
              <button className="bg-black text-white px-4 py-2 hover:bg-green-600 mt-2" onClick={() => navigate(`/product/${product._id}`)}>
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-grow w-full">
      <div className="mx-auto flex flex-col gap-7 px-4 w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Shop by Categories</h1>
        {categories.map((category) => renderCategoryRow(category))}
      </div>
    </div>
  );
}

export default Categories;
