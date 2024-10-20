import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BannerSlider from '../components/BannerSlider';

function MainLandingPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/product/get')
      .then((response) => {
        // Access the products array from the API response
        console.log(response);
        
        if (response.data.success) {
          setData(response.data.products);
        } else {
          console.error('Error: API response not successful');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="flex flex-col flex-grow w-full">
      <div className=""><BannerSlider/></div>
      <div className=" mx-auto flex flex-col gap-7 px-4 w-full ">
        <h1 className="text-3xl font-bold mb-8 text-center">Items</h1>
        <div className='flex flex-row w-full h-96'>
        <div className='flex flex-col h-full w-full bg-[#000] hover:scale-105 transition-transform duration-1000 ease-in-out'>
        </div>


          <div className='flex flex-col w-full'>
          <div className='flex flex-col'>
              
          </div>
           <div className='flex flex-col'>
              
          </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <div 
              key={item._id} 
              className="relative bg-white h-60 rounded-lg shadow-md overflow-hidden group"
            >
              <img
                src={item.images[0].url} 
                alt={item.name}
                className="object-contain w-full h-full group-hover:opacity-50 transition-opacity duration-300"
              />
              
              {/* Details on hover */}
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 transition-opacity duration-300 p-4 text-center">
                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-gray-800 font-semibold">Price: ₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainLandingPage;
