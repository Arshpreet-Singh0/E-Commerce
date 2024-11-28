import React from 'react';
import { useLocation } from 'react-router-dom';
import { Result, Button } from 'antd';

const PaymentSuccess = () => {
  // Get the query string from the URL
  const location = useLocation();

  // Parse the transaction ID from the query string
  const queryParams = new URLSearchParams(location.search);
  const transactionId = queryParams.get('key') || 'N/A';

  return (
    <div className="flex items-center justify-center h-[60vh] bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg max-w-md">
        <Result
          status="success"
          title="Payment Successful!"
          subTitle={`Transaction ID: ${transactionId}`}
          extra={[
            <Button type="primary" key="home" href="/">
              Go to Homepage
            </Button>,
            <Button key="receipt" href={`/receipt?transactionId=${transactionId}`}>
              View Receipt
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default PaymentSuccess;
