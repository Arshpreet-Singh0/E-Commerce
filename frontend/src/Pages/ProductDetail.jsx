import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loder from "../components/Loder";
import Carousel from "../components/Cursol";
import Star from "../components/Star";
import { Button, Modal, message } from "antd";
const { confirm } = Modal;
import ReviewComponent from "../components/review";
const PRODUCT_API_END_POINT = import.meta.env.VITE_PRODUCT_API_END_POINT;
const CART_API_END_POINT = import.meta.env.VITE_CART_API_END_POINT;
import { useSelector, useDispatch } from "react-redux";
import { setCartItems } from "../redux/cartSlice.js";
import { IoCartOutline } from "react-icons/io5";
import QuantitySelector from "../components/Quantity.jsx";
import { setBuyProduct } from "../redux/productSlice.js";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useSelector((store) => store.auth);
  // const {cartItems} = useSelector(store=>store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdmin = user?._id === product?.created_by;
  const handleEditButtonClick = () => {
    navigate(`/admin/product/${id}/edit`);
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await axios.get(`${PRODUCT_API_END_POINT}/get/${id}`);
        setProduct(res?.data?.product);
        setImgUrl(res.data.product?.images?.[0]?.url || ""); // Set initial image URL if available
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleAddToCart = async (productid) => {
    if (!user) {
      navigate("/sign-in");
    }
    try {
      const res = await axios.post(
        `${CART_API_END_POINT}/addproduct`,
        { productid },
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setCartItems(res?.data?.cart));
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDeleteProductButtonClick = () => {
    confirm({
      title: "Are you sure you want to delete this Product?",
      content: "This action cannot be undone.",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          setLoading(true);
          const response = await axios.post(
            `${PRODUCT_API_END_POINT}/delete/${id}`,
            {},
            {
              withCredentials: true,
            }
          );
          if (response?.data?.success) {
            message.success(response?.data?.message);
            navigate("/admin");
          }
        } catch (error) {
          message.error(error?.response?.data?.message || "An error occurred!");
        } finally {
          setLoading(false);
        }
      },
      onCancel: () => {
        message.info("Action canceled.");
      },
    });
  };

  const handleBuyButtonClick = ()=>{
    dispatch(setBuyProduct(product));
    if(user==null){
      message.error("Please login to buy product");
      navigate(`/sign-in?next=/buy/${product._id}`);
    }
    else
    navigate(`/buy/${product._id}`);
  }

  if (loading) {
    return <Loder />;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        {product ? (
          <div className="">
            <div className="pt-11 grid grid-cols-1 md:grid-cols-2 gap-10 w-auto h-auto">
              <div className="flex flex-start gap-10 ">
                <div>
                  {/* Display images if available */}
                  {product.images && product.images.length > 0 ? (
                    product.images.map((item, index) => (
                      <img
                        src={item.url}
                        alt={`Product image ${index + 1}`}
                        key={item._id}
                        className={`w-24 cursor-pointer opacity-80 hover:opacity-100 duration-300 ${
                          imgUrl === item.url &&
                          "border border-gray-500 rounded-sm opacity-100"
                        }`}
                        onClick={() => setImgUrl(item.url)}
                      />
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
                <div className="w-full h-full	flex flex-col">
                  <img
                    src={imgUrl}
                    alt="Selected Product"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="px-4 flex-1 h-auto">
                <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
                <Star stars={product?.ratings} />
                <p className="text-2xl font-semibold text-gray-800 mb-2 mt-2">
                  &#8377;{product?.price}{" "}
                  <span className="text-gray-500 text-sm line-through">
                    &#8377; {product?.price + product?.price / 10}
                  </span>{" "}
                  <span className="text-green-600 text-md">10% off</span>
                </p>
                {isAdmin ? (
                  <div className="flex gap-10 mt-5">
                    <Button
                      type="primary" className="px-10 py-3 h-10"
                      onClick={handleEditButtonClick}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger" variant="solid" className="px-10 py-3 h-10"
                      onClick={handleDeleteProductButtonClick}
                    >
                      Delete Product
                    </Button>
                  </div>
                ) : (
                  <>
                  <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>
                  <div className="flex gap-10 items-center">
                    <Button type="primary" className="px-10 py-3 h-10" onClick={handleBuyButtonClick}>
                      Buy Now
                    </Button>
                    <Button
                      color="danger"
                      variant="solid"
                      className="px-6 py-3 rounded-lg hover:bg-green-600 h-10"
                      onClick={() => handleAddToCart(product?._id)}
                    >
                      <IoCartOutline /> Add to Cart
                    </Button>
                  </div>
                  </>
                )}
                <div className="mt-8">
                  <h1 className="text-lg text-gray-700">Description : </h1>
                  <p className="text-lg text-gray-700 mb-4 md:text-justify">
                    {product?.description}!
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              {!isAdmin && (
                <ReviewComponent
                  reviews={product?.reviews}
                  productId={product?._id}
                  setProduct={setProduct}
                />
              )}
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
