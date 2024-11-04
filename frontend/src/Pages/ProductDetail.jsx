import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loder from '../components/Loder'; // Assuming you have a Loader component
import Carousel from '../components/Cursol'; // Correct the import name if necessary
import Star from '../components/Star';
import { Button } from 'antd';
import ReviewComponent from '../components/review';
import { CART_API_END_POINT } from '../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../redux/cartSlice.js';

const ProductDetail = () => {
  const { id } = useParams(); // Getting product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);
  const {user} = useSelector(store=>store.auth);
  const {cartItems} = useSelector(store=>store.cart);
   const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        console.log(id);
        const res = await axios.get(`http://localhost:8080/api/v1/product/get/${id}`);
        console.log(res.data.product);
        setProduct(res?.data?.product);
        setImgUrl(res.data.product?.images?.[0]?.url || ''); // Set initial image URL if available
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);


  const fetchCart = async () => {
      try {
        const res = await axios.get(`${CART_API_END_POINT}/get`, {
          withCredentials: true,
        });
        
        if (res?.data?.success) {
          console.log(res.data.cart)
          dispatch(setCartItems(res?.data?.cart));
        }
      } catch (error) {
        console.log(error);
      }
    }

  const handleAddToCart = async(productid)=>{
    if(!user){
      navigate('/sign-in');
    }
    try {
      const res = await axios.post(`${CART_API_END_POINT}/addproduct`,{productid},{
        withCredentials : true,
      })
      
      fetchCart();
    } catch (error) {
      console.log(error);
      
    }
  }

  if (loading) {
    return <Loder />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {product ? (
        <div>
          <div className="pt-11 grid grid-cols-1 h-[50vh] md:grid-cols-2 gap-10">
            <div className="flex flex-start gap-10">
              <div>
                {/* Display images if available */}
                {product.images && product.images.length > 0 ? (
                  product.images.map((item, index) => (
                    <img
                      src={item.url}
                      alt={`Product image ${index + 1}`}
                      key={item._id}
                      className={`w-24 cursor-pointer opacity-80 hover:opacity-100 duration-300 ${
                        imgUrl === item.url && 'border border-gray-500 rounded-sm opacity-100'
                      }`}
                      onClick={() => setImgUrl(item.url)}
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
              <div className='w-full h-full	flex flex-col'>
                <img src={imgUrl} alt="Selected Product" className=" object-cover" />
              </div>
            </div>
            <div className="md:w-1/2 px-4">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <Star stars={product?.ratings} />
              <p className="text-lg text-gray-700 mb-4">{product.description}</p>
              <p className="text-2xl font-semibold text-gray-800 mb-6">
                ${product.price}
              </p>
              <Button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-green-600" onClick={()=>handleAddToCart(product?._id)}>
                Add to Cart
              </Button>
            </div>
          </div>
          <div className='mt-[30vh]'>
          <ReviewComponent reviews={product?.reviews} productId={product?._id} />
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetail;
