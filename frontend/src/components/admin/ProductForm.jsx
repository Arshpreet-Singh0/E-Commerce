import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { CATEGORIES_API_END_POINT } from "../../utils/constant";
import { ToastContainer } from "react-toastify";
const { TextArea } = Input;

const ProductForm = ({ product, handleChange, setProduct, selectedCategory, setSelectedCategory , selectedSubCategory, setSelectedSubCategory, loading, handleFormSubmit, editForm}) => {
  const [subCategories, setSubCategories] = useState([]);
  const { categories } = useSelector((store) => store.category);

  // console.log(categories);

  const handleCategoryChange = (value) => {
    console.log(value);
    setSubCategories([]);
    setSelectedSubCategory(null);
    
    setProduct((p)=>(
      {...p, category: value}
    ))
    const category = categories.find((item)=>item._id===value);
    
    setSelectedCategory(category?.name);
    fetchSubCategories(value);
  };
  const handleSubCategoryChange = (value) => {
    console.log(value);
    setProduct((p)=>(
      {...p, subcategory: value}
    ))
    const subCategory = subCategories.find((item)=>item._id===value);
    
    setSelectedSubCategory(subCategory?.name);
  };
  const fetchSubCategories = async (id) => {
    const response = await axios.get(`${CATEGORIES_API_END_POINT}/get/${id}`);
    setSubCategories(response?.data?.subCategories);
  };

  fetchSubCategories(product?.category?._id);

  return (
    <div className="w-[600px] mx-auto mt-5">
       <ToastContainer position="top-right"/>
      <h1 className="text-2xl font-bold">{editForm==true ? 'Edit Product Details : ' : 'List New Product'}</h1>

      <form className="mt-5 mb-10" onSubmit={handleFormSubmit}>
        <Form.Item label="Product Name :" layout="vertical">
          <Input
            placeholder="Product Name"
            className="w-full p-2 rounded mt-1"
            name="name"
            value={product?.name}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Description : " layout="vertical">
          <TextArea
            rows={4}
            name="description"
            value={product?.description}
            className="w-full p-2 rounded mt-1"
            onChange={handleChange}
          />
        </Form.Item>
        <div className="flex gap-4">
        <Form.Item label="Category : " layout="vertical" className="flex-1">
          <Select
            placeholder="Select a category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories?.map((item, idx) => (
              <Select.Option value={item?._id}>{item?.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Sub Category : " layout="vertical" className="flex-1">
          <Select value={selectedSubCategory}
          placeholder="Select Sub Category"
          onChange={handleSubCategoryChange}>
            {subCategories?.map((item, idx) => (
              <Select.Option value={item._id}>{item?.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        </div>
        <div className="flex gap-4">
        <Form.Item
          label="Price : "
          layout="vertical"
          rules={[
            {
              required: true,
            },
          ]}
          className="flex-1"
        >
          <Input
            placeholder="Price"
            className="w-full p-2 rounded "
            name="price"
            onChange={handleChange}
            value={product?.price}
          />
        </Form.Item>
        <Form.Item
          label="Stock : "
          layout="vertical"
          rules={[
            {
              required: true,
            },
          ]}
          className="flex-1"
        >
          <Input
            placeholder="Stock"
            className="w-full p-2 rounded "
            name="stock"
            onChange={handleChange}
            value={product?.stock}
          />
        </Form.Item>
        </div>
        <Form.Item
          label="Brand : "
          layout="vertical"
          rules={[
            {
              required: true,
            },
          ]}
          className="flex-1"
        >
          <Input
            placeholder="Brand"
            className="w-full p-2 rounded "
            name="brand"
            onChange={handleChange}
            value={product?.brand}
          />
        </Form.Item>

        <Button type="primary" className="w-24" loading={loading} htmlType="submit">Edit</Button>
      </form>
    </div>
  );
};

export default ProductForm;
