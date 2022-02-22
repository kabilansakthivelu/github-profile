import React, {useContext} from 'react';
import {StateContext} from '../../App';
import { Layout, Typography } from 'antd';
import './Compare.css';

const { Header } = Layout;
const { Title } = Typography;

const Compare = () => {

  const {state} = useContext(StateContext);
  
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