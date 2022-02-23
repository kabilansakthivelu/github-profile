import React, { useContext } from "react";
import { StateContext } from "../../App";
import { Layout, Typography, Tag, Image } from "antd";
import "./Compare.css";

const { Header, Content } = Layout;
const { Title } = Typography;

const Compare = () => {
  const { state } = useContext(StateContext);

  return (
    <div>
      <Layout>
        <Header>
          <Typography.Text strong={true} className="logo">
            Github
          </Typography.Text>
        </Header>
        <Content className="content">
          <div className="compareSection">
            <div className="fieldLabels">
              <p className="fieldLabel">Name</p>
              <p className="fieldLabel">Company</p>
              <p className="fieldLabel">Location</p>
              <p className="fieldLabel">Followers</p>
              <p className="fieldLabel">Following</p>
              <p className="fieldLabel">Repos</p>
              <p className="fieldLabel">Joined</p>
            </div>
            {state.users.map((user) => {
              return (
                <div key={user.id} className="singleUser">
                <div className="userAvatarContainer">
                <div>
                  <Image
                    src={user.avatar_url}
                    alt={user.id}
                    className="userAvatar"
                  />
                  </div>
                  </div>
                  <p>{user.name || "-"}</p>
                  <p>{user.company || "-"}</p>
                  <p>{user.location || "-"}</p>
                  <p>{user.followers}</p>
                  <p>{user.following}</p>
                  <p>{user.public_repos}</p>
                  <p>{user.created_at.slice(0, 10)}</p>
                </div>
              );
            })}
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Compare;
