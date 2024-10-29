import React from 'react'
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';

function CartLogo() {
  return (
    <Space size="middle">
    <Badge count={0}>
      <Avatar shape="square" size="large" />
    </Badge>
    {/* <Badge count={0} showZero>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge
      count={
        <ClockCircleOutlined
          style={{
            color: '#f5222d',
          }}
        />
      }
    >
      <Avatar shape="square" size="large" />
    </Badge> */}
  </Space>
  )
}

export default CartLogo