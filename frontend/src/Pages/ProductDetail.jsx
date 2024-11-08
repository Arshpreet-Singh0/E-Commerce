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

  const isAdmin = user?._id===product?.created_by;
  console.log(isAdmin);
  
  

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/product/get/${id}`);
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

  const handleAddToCart = async(productid)=>{
    if(!user){
      navigate('/sign-in');
    }
    try {
      const res = await axios.post(`${CART_API_END_POINT}/addproduct`,{productid},{
        withCredentials : true,
      })
      
      if(res?.data?.success){
        dispatch(setCartItems(res?.data?.cart));
      }
      
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
          <div className="pt-11 grid grid-cols-1 h-[50vh] md:grid-cols-2 gap-10 w-auto">
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
                <img src={imgUrl} alt="Selected Product" className="object-contain h-60" />
              </div>
            </div>
            <div className="md:w-1/2 px-4 flex-1">
              <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
              <Star stars={product?.ratings} />
              <p className="text-lg text-gray-700 mb-4">{product?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Error magnam exercitationem illo sed, nesciunt veniam incidunt vero rerum dolor explicabo perspiciatis nulla nobis voluptates libero sint autem doloribus atque non! Quod amet ad eum qui cupiditate exercitationem velit facilis ut nam deserunt perspiciatis illo possimus, earum unde nobis necessitatibus reprehenderit recusandae fuga nulla consectetur! Qui, totam tempora ducimus ipsa iure, corporis aut fugiat dolor error cum animi sequi debitis vel quasi architecto quidem ab rem atque minus numquam tempore. Aliquid alias corrupti ullam saepe ipsum quos sint quidem numquam minus, quaerat non hic, exercitationem sed quis consequatur eaque? Veritatis, at. Doloremque explicabo soluta quaerat ad officia enim modi libero. Similique quisquam dolorum cum delectus maxime esse debitis molestias quis culpa, repellendus temporibus dolores quos nostrum sequi, corporis provident omnis libero quam quibusdam dolorem obcaecati harum nam? Reprehenderit, ullam blanditiis harum quo dolore sit eaque, repellendus et nesciunt at provident, aliquam omnis similique porro ducimus nobis iure labore suscipit deleniti voluptatibus tenetur praesentium fuga consequuntur? Eligendi consequatur quas quam eum ullam est aperiam inventore ea hic sit! Enim impedit debitis iste? Quod sit fugit odio culpa ab possimus, tempora illum aliquam, vero aspernatur quae id! Sapiente vel praesentium ipsam similique pariatur!</p>
              <p className="text-2xl font-semibold text-gray-800 mb-6">
              &#8377;{product?.price}
              </p>
              { isAdmin ? (
                <div className='flex justify-between'>
                <Button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-green-600">
                Edit 
              </Button>
                <Button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-green-600">
                Delete Product
              </Button>
                </div>
              ) : <Button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-green-600" onClick={()=>handleAddToCart(product?._id)}>
                Add to Cart
              </Button>}
            </div>
          </div>
          <div className='mt-[30vh]'>
          {!isAdmin && <ReviewComponent reviews={product?.reviews} productId={product?._id} />}
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetail;
