import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from '../../components/admin/ProductForm.jsx'
import { useNavigate, useParams } from "react-router";
import { PRODUCT_API_END_POINT } from "../../utils/constant";
import { message } from "antd";

export const ProductEditForm = () => {
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/product/get/${id}`
        );

        setProduct(res?.data?.product);
        setSelectedCategory(res?.data?.product?.category?.name);
        setSelectedSubCategory(res?.data?.product?.subcategory?.name);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleChange = (e) => {
    setProduct((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  
  const handleFormSubmit = async(e)=>{
    e.preventDefault();
    const productDeatils = {};
    productDeatils.name = product?.name;
    productDeatils.description = product?.description;
    if(product?.price) productDeatils.price = product?.price
    productDeatils.stock = product?.stock;
    productDeatils.brand = product?.brand;
    if(product?.category?.name !== selectedCategory) productDeatils.category = product?.category;
    if(product?.subcategory?.name !== selectedSubCategory) productDeatils.subcategory = product?.subcategory;
    
    console.log(productDeatils);
    
    try {
      setLoading(true);

      const response = await axios.post(`${PRODUCT_API_END_POINT}/update/${id}`, productDeatils, {
        withCredentials : true,
      })

      console.log(response);
      if(response?.data?.success){
        message.success(response?.data?.message);

        setTimeout(()=>{
          navigate(`/product/${id}`);
        },1000)
      }
      
    } catch (error) {
      message.error(error?.response?.data?.message || "An error occurred!");
    }finally{
      setLoading(false);
    }
  }
  
  return (
    <div className="">
      
      <ProductForm
        product={product}
        handleChange={handleChange}
        setProduct={setProduct}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        loading={loading}
        handleFormSubmit={handleFormSubmit}
        editForm={true}
      />
    </div>
  );
};
