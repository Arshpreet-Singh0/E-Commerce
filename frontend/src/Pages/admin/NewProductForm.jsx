import React, { useEffect, useState } from "react";
import ProductForm from "../../components/admin/ProductForm";
import { useNavigate } from "react-router";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "../../utils/constant";
import { toast, ToastContainer } from "react-toastify";

const NewProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: null,
    category: "",
    subcategory: "",
    stock: null,
    brand: ""
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };
  const handleChange = (e) => {
    setProduct((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async(e)=>{
    e.preventDefault();
    console.log(product);
    
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('subcategory', product.subcategory);
    formData.append('stock', product.stock);
    formData.append('brand', product.brand);
    files.forEach((file) => {
      formData.append('images', file)
    });

    try {
      setLoading(true);
      const res = await axios.post(`${PRODUCT_API_END_POINT}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
          },
          withCredentials : true,
      });
      if(res?.data?.success){
        toast.success(res?.data?.message);
        setTimeout(()=>{
          navigate('/admin');
        },1000)
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred!");
    }finally{
      setLoading(false);
    }
    
  }

  return (
    <>
      <ToastContainer position="top-right" />
      <ProductForm
        handleFileUpload={handleFileUpload}
        files={files}
        product={product}
        handleChange={handleChange}
        setProduct={setProduct}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        loading={loading}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default NewProductForm;
