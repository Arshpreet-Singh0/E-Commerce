import React, { useEffect, useState } from "react";
import EditForm from "../../components/admin/EditForm";
import axios from "axios";
import { useParams } from "react-router";

export const ProductEditForm = () => {
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
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

  console.log(product);

  return (
    <div className="">
      <EditForm
        product={product}
        handleChange={handleChange}
        setProduct={setProduct}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
      />
    </div>
  );
};
