// Import necessary modules and components
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ContactPage = () => {
  const onFinish = (values) => {
    console.log('Form Values:', values);
    // Handle form submission here
  };

  return (
    <div className="flex flex-col items-center py-12 px-6 bg-gray-50 min-h-screen">
      {/* Main Content Box */}
      <div className="w-full max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
        
        {/* Title */}
        <Title level={2} className="text-center text-gray-800 mb-6 font-semibold">
          Get in Touch
        </Title>
        
        {/* Subtitle */}
        <Text className="text-center text-gray-500 mb-10 block text-lg">
          Have questions? We’d love to hear from you!
        </Text>
        
        {/* Contact Information Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0 md:space-x-6 text-gray-600">
          <div className="flex items-center">
            <EnvironmentOutlined className="text-xl text-blue-500 mr-3" />
            <span>123 E-commerce St, Shopping City</span>
          </div>
          <div className="flex items-center">
            <PhoneOutlined className="text-xl text-blue-500 mr-3" />
            <span>+123 456 7890</span>
          </div>
          <div className="flex items-center">
            <MailOutlined className="text-xl text-blue-500 mr-3" />
            <span>support@shop.com</span>
          </div>
        </div>

        {/* Contact Form */}
        <Form
          name="contact_form"
          layout="vertical"
          onFinish={onFinish}
          className="space-y-6"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="John Doe" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter a valid email', type: 'email' }]}
          >
            <Input placeholder="email@example.com" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <Input.TextArea rows={5} placeholder="Your message here..." className="rounded-lg" />
          </Form.Item>

          <Form.Item className="text-center">
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full md:w-auto px-8 py-2 font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ContactPage;
