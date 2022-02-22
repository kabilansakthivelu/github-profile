import React, {useContext} from 'react';
import {StateContext} from '../../App';
import { Layout, Typography } from 'antd';
import './Compare.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const Compare = () => {

  const {state} = useContext(StateContext);

  return (
    <div>
    <Layout>
      <Header>
      <Typography.Text strong={true} className="logo">Github</Typography.Text>
      </Header>
      <Content>
      <div style={{display:"flex", justifyContent:"space-between"}}>
      <div style={{marginTop: "300px"}}>
          <p>name</p>
          <p>company</p>
          <p>location</p>
            <p>followers</p>
          <p>following</p>
          <p>Repos</p>
          <p>joined date</p>
      </div>
      {state.users.map((user)=>{
        return (
          <div key={user.id}>
          <img src={user.avatar_url} alt="" height="300" style={{borderRadius: "200px"}}/>
          <p>{user.name || "-"}</p>
          <p>{user.company || "-"}</p>
          <p>{user.location || "-"}</p>
          <p>{user.followers}</p>
          <p>{user.following}</p>
          <p>{user.public_repos}</p>
          <p>{(user.created_at).slice(0, 10)}</p>
          </div>
        )
      })}
      </div>
      </Content>
    </Layout>
    </div>
  )
}

export default Compare;