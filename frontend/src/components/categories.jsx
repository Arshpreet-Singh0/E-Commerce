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
    Electronics: 'http://localhost:8080/api/v1/product/get/category/Electronics',
    TVsAppliances: 'http://localhost:8080/api/v1/product/get/category/TVs & Appliances',
    Grocery: 'http://localhost:8080/api/v1/product/get/category/Grocery',
    Fashion: 'http://localhost:8080/api/v1/product/get/category/Fashion',
    Beauty: 'http://localhost:8080/api/v1/product/get/category/Beauty',
    Furniture: 'http://localhost:8080/api/v1/product/get/category/Furniture',
  };
  
  const fetchCategories = async () => {
    try {
      const categoryPromises = Object.keys(apiUrls).map(async (key) => {
        const response = await axios.get(apiUrls[key]);
        // console.log("res" ,response.data.products)
        return {
          name: key,
          products: response.data.products || [],
        };
      });
      const categoriesData = await Promise.all(categoryPromises);
      console.log(categoriesData);
      
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
  // console.log(categories);
  if (loading) {
    return <Loder />;
  }

  // Handle product click to navigate to the product detail page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const renderCategoryRow = (category) => {
    console.log("category " , category);
    
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
            onClick={() => navigate(`/categories/${category.name}`)} // Navigate to Categories page with category name
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

  console.log(categories);
  
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
