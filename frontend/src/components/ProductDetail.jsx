import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loder from '../components/Loder'; // Assuming you have a Loader component
import Carousel from './Cursol';

const ProductDetail = () => {
  const { id } = useParams(); // Getting product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        console.log(id)
        const res = await axios.get(`http://localhost:8080/api/v1/product/get/${id}`);
        console.log(res.data.product)
        setProduct(res.data.product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <Loder />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {product ? (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Carousel data={product.images} />
          </div>
          <div className="md:w-1/2 px-4">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-gray-800 mb-6">
              ${product.price}
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-green-600">
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetail;
