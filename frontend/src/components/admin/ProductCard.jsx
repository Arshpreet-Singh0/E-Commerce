import React from 'react'
import { useNavigate } from 'react-router'

const ProductCard = ({product}) => {
  const navigate = useNavigate();

  return (
            <div className="border rounded-lg p-4 shadow-md">
            <img src={product.images[0].url} alt={product?.name} className="w-full h-32 object-contain rounded-md mb-2" />
            <h2 className="text-lg font-semibold">{product?.name}</h2>
            <p className="text-gray-700">&#8377;{product?.price}</p>

            <button className="bg-black text-white px-4 py-2 hover:bg-green-600 mt-2" onClick={() => navigate(`/product/${product._id}`)}>
              See Details
              </button>
    </div>
  )
}

export default ProductCard