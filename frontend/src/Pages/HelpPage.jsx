import React from 'react';
import { Typography, Collapse, Button, Divider } from 'antd';
import { MailOutlined, PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const HelpPage = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center py-12 px-6 bg-gray-50 min-h-screen">
      {/* Main Content Box */}
      <div className="w-full max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-2xl border border-gray-200">
        
        {/* Title */}
        <Title level={2} className="text-center text-gray-800 mb-6 font-semibold">
          Help Center
        </Title>

        {/* Introduction Text */}
        <Text className="text-center text-gray-500 mb-8 block text-lg">
          Have questions? We're here to help! Browse our FAQs or contact us directly.
        </Text>

        {/* FAQs Section */}
        <Collapse className="mb-10" accordion>
          <Panel header="How do I place an order?" key="1">
            <Text>
              To place an order, simply browse our products, add items to your cart, and proceed to checkout. Follow the on-screen instructions to complete your order.
            </Text>
          </Panel>
          <Panel header="What payment methods do you accept?" key="2">
            <Text>
              We accept various payment methods, including major credit cards, debit cards, and PayPal. Ensure that your payment method is valid and has sufficient funds.
            </Text>
          </Panel>
          <Panel header="How can I track my order?" key="3">
            <Text>
              You can track your order by visiting the 'Orders' section in your account dashboard. You will receive email updates on your order status as well.
            </Text>
          </Panel>
          <Panel header="What is your return policy?" key="4">
            <Text>
              We offer a 30-day return policy for unopened items. If you wish to return an item, please ensure it is in its original packaging.
            </Text>
          </Panel>
          <Panel header="How can I change my account details?" key="5">
            <Text>
              You can update your account information in the 'Profile' section of your account settings. Make sure to save any changes before exiting.
            </Text>
          </Panel>
          <Panel header="What should I do if I forget my password?" key="6">
            <Text>
              Click on the 'Forgot Password' link on the login page. Follow the instructions to reset your password using your registered email.
            </Text>
          </Panel>
          <Panel header="Can I modify my order after placing it?" key="7">
            <Text>
              Once an order is placed, it cannot be modified. If you need to make changes, please contact our support team as soon as possible.
            </Text>
          </Panel>
        </Collapse>

        {/* Contact Information Section */}
        <Divider className="my-10" />

        <Title level={3} className="text-gray-800 mb-4 text-center">Need More Help?</Title>
        <Text className="text-center text-gray-600 mb-6 block">
          If you have any further questions, feel free to reach out to our support team.
        </Text>

        <div className="flex flex-col items-center text-gray-600 mb-8">
          <Text className="flex items-center mb-4">
            <PhoneOutlined className="text-xl text-blue-500 mr-2" />
            <span>+123 456 7890</span>
          </Text>
          <Text className="flex items-center mb-4">
            <MailOutlined className="text-xl text-blue-500 mr-2" />
            <span>support@shop.com</span>
          </Text>
          <Text className="flex items-center mb-4">
            <ClockCircleOutlined className="text-xl text-blue-500 mr-2" />
            <span>Mon - Fri: 9 AM - 5 PM</span>
          </Text>
        </div>

        {/* Contact Button */}
        <div className="text-center">
          <Button 
            type="primary" 
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
            onClick={() => navigate('/Contact')}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
