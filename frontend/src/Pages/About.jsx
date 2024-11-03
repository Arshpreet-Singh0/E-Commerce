import React from 'react';
import { Layout, Card, Divider, Avatar, Timeline, Typography, Button, Carousel, Collapse, Rate } from 'antd';
import { TeamOutlined, TrophyOutlined, CheckCircleOutlined, SmileOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const AboutPage = () => {
    const navigate = useNavigate();

  return (
    <Layout className="bg-gray-100">
      <Content className="p-8 md:p-16">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-10">
          <Title level={1} className="text-center text-gray-800 mb-4">About Us</Title>

          {/* Company Story Section */}
          <section className="mb-10">
            <Title level={2} className="text-gray-700">Our Story</Title>
            <Divider />
            <Paragraph className="text-gray-600">
              Established in [Year], [Company Name] started with a simple mission: to provide high-quality products to everyone, everywhere. Over the years, we've grown from a small operation to a trusted brand in the industry, delivering [specialty] to countless satisfied customers.
            </Paragraph>
          </section>

          {/* Mission and Values Section */}
          <section className="mb-10">
            <Title level={2} className="text-gray-700">Our Mission & Values</Title>
            <Divider />
            <Paragraph className="text-gray-600">
              At [Company Name], we believe in quality, integrity, and exceptional customer service. Our mission is to continually exceed our customers' expectations by offering products that combine quality and affordability.
            </Paragraph>
            <div className="flex flex-wrap gap-6 mt-4">
              <Card className="flex-1 bg-gray-50 shadow-md hover:shadow-lg transition duration-300">
                <CheckCircleOutlined className="text-blue-600 text-3xl mb-2" />
                <Title level={4} className="text-gray-800">Quality Products</Title>
                <Paragraph>We prioritize quality at every step to ensure you receive the best.</Paragraph>
              </Card>
              <Card className="flex-1 bg-gray-50 shadow-md hover:shadow-lg transition duration-300">
                <CheckCircleOutlined className="text-blue-600 text-3xl mb-2" />
                <Title level={4} className="text-gray-800">Customer Satisfaction</Title>
                <Paragraph>Your satisfaction drives us to improve continuously.</Paragraph>
              </Card>
              <Card className="flex-1 bg-gray-50 shadow-md hover:shadow-lg transition duration-300">
                <CheckCircleOutlined className="text-blue-600 text-3xl mb-2" />
                <Title level={4} className="text-gray-800">Innovation</Title>
                <Paragraph>We embrace innovation to bring you the latest trends and technology.</Paragraph>
              </Card>
            </div>
          </section>

          {/* Achievements Section */}
          <section className="mb-10">
            <Title level={2} className="text-gray-700">Achievements</Title>
            <Divider />
            <Timeline mode="alternate" className="mt-6">
              <Timeline.Item dot={<TrophyOutlined className="text-green-600 text-lg" />}>
                <Paragraph className="text-gray-600">Awarded Best New E-Commerce Company in 2022</Paragraph>
              </Timeline.Item>
              <Timeline.Item dot={<TrophyOutlined className="text-green-600 text-lg" />}>
                <Paragraph className="text-gray-600">Achieved 1 Million Sales Milestone in 2023</Paragraph>
              </Timeline.Item>
              <Timeline.Item dot={<TrophyOutlined className="text-green-600 text-lg" />}>
                <Paragraph className="text-gray-600">Expanded to Global Markets in 2024</Paragraph>
              </Timeline.Item>
            </Timeline>
          </section>

          {/* Testimonials Section */}
          <section className="mb-10">
            <Title level={2} className="text-gray-700">What Our Customers Say</Title>
            <Divider />
            <Carousel autoplay className="mt-6">
              <div className="text-center">
                <SmileOutlined className="text-yellow-500 text-4xl mb-2" />
                <Paragraph className="text-gray-600 italic">"Fantastic service and high-quality products. Highly recommend!"</Paragraph>
                <Rate disabled defaultValue={5} />
              </div>
              <div className="text-center">
                <SmileOutlined className="text-yellow-500 text-4xl mb-2" />
                <Paragraph className="text-gray-600 italic">"Exceptional customer support and fast delivery. Will definitely order again!"</Paragraph>
                <Rate disabled defaultValue={4} />
              </div>
            </Carousel>
          </section>

          {/* Call-to-Action Banner */}
          <section className="my-10">
            <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
              <Title level={2} className="text-white">Join Us on Our Journey!</Title>
              <Paragraph>Explore our product range and experience quality like never before. Stay updated with the latest trends and deals.</Paragraph>
              <Button type="primary" size="large" className="mt-4 bg-yellow-400 text-blue-900 hover:bg-yellow-300" onClick={()=>navigate('/')}>Shop Now</Button>
            </div>
          </section>

          {/* Meet Our Team Section */}
          <section className="mb-10">
            <Title level={2} className="text-gray-700">Meet Our Team</Title>
            <Divider />
            <div className="flex flex-wrap gap-6 mt-4">
              {['Arsh somal', 'Ajay Dattu', 'Alice Brown', 'Bob Johnson'].map((name, index) => (
                <Card key={index} className="flex-1 bg-gray-50 shadow-md hover:shadow-lg transition duration-300">
                  <Avatar size={64} icon={<TeamOutlined />} className="mx-auto mb-4" />
                  <Title level={4} className="text-center text-gray-800">{name}</Title>
                  <Paragraph className="text-center text-gray-600">Software Developers</Paragraph>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-10">
            <Title level={2} className="text-gray-700">Frequently Asked Questions</Title>
            <Divider />
            <Collapse className="mt-6">
              <Panel header="What is your return policy?" key="1">
                <Paragraph>We offer a 30-day return policy on all products. Please contact our support team for assistance.</Paragraph>
              </Panel>
              <Panel header="Do you ship internationally?" key="2">
                <Paragraph>Yes, we ship to select international destinations. Please refer to our shipping policy for more details.</Paragraph>
              </Panel>
              <Panel header="How can I track my order?" key="3">
                <Paragraph>Once your order is shipped, we’ll provide a tracking number via email for easy tracking.</Paragraph>
              </Panel>
            </Collapse>
          </section>
        </div>
      </Content>
    </Layout>
  );
};

export default AboutPage;
