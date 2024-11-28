import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import axios from 'axios';
import SearchPageCard from '../components/SearchPageCard.jsx'

const SearchPage = () => {
    const [products, setproducts] = useState([]);
    const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get('search') || 'N/A';
  console.log(searchValue);
  

    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/product/get?keyword=${searchValue}`);
                setproducts(res?.data?.products);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            }
        };
        fetchProducts();

    },[searchValue]);
    
  return (
    <div className='flex flex-col gap-5 mt-10 mb-10'>
    {
        products?.map((product,idx)=>(
            <SearchPageCard product={product} key={product._id}/>
        ))
    }
    </div>
  )
}

export default SearchPage