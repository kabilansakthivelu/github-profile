import React from 'react';
import { Layout } from 'antd';
import './Compare.css';

const { Header } = Layout;

const Compare = () => {

  return (
    <div>
    <Layout>
      <Header>
      <Typography.Text strong={true} className="logo">Github</Typography.Text>
      </Header>
    </Layout>
    </div>
  )
}

export default Compare;