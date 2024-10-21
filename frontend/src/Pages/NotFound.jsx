import React from 'react';
import notFound from '../assets/404.jpg';

const NotFound = () => {
     return (
          <div className="flex flex-col items-center justify-center h-screen text-center">
               <h1 className="text-4xl font-bold mb-6 text-gray-800">Page Not Found</h1>
               <h2>Please go back to Home</h2>
               <img
                    src={notFound}
                    alt="Not Found"
                    className="w-2/3 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg border border-gray-200"
                    style={{
                         filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.7))',
                         backdropFilter: 'blur(4px)',
                         borderRadius: '8px',
                    }}
               />
          </div>
     );
};

export default NotFound;
