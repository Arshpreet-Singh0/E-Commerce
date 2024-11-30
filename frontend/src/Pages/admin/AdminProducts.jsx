import React, { useEffect, useState } from "react";
import axios from "axios";
const PRODUCT_API_END_POINT = import.meta.env.VITE_PRODUCT_API_END_POINT;
import ProductCard from "../../components/admin/ProductCard";
import { Button } from "antd";
import { useNavigate } from "react-router";
import Loader from "../../components/Loder";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAdminProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${PRODUCT_API_END_POINT}/get/admin`, {
          withCredentials: true,
        });

        if (res?.data?.success) {
          setProducts(res?.data?.products);
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    };
    getAdminProducts();
  }, []);

  if(loading){
    return <Loader />
  }


  return (
    <div className="container mx-auto p-4 mt-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-8">Listed Products</h1>
        <Button
          className="py-5"
          type="primary"
          onClick={() => navigate("/admin/product/new")}
        >
          List New Product
        </Button>
      </div>
      {
        products.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product, idx) => (
          <ProductCard product={product} key={product?._id} />
        ))}
      </div>
        ) : (
            <div className="mx-auto">
            <p className="text-lg font-bold text-center mt-10">No products listed</p>
            <img src="https://img.freepik.com/free-vector/detective-following-footprints-concept-illustration_114360-21835.jpg?t=st=1732629634~exp=1732633234~hmac=4b9fb2e8a2d3398fe1526c2732eb59e361c550e326146e3b6e3258db818c9d43&w=1380" className="h-[70vh] mx-auto" alt="" />
            </div>
        )
      }
    </div>
  );
};

export default AdminProducts;
