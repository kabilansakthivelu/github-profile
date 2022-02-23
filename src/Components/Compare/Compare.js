import React, { useContext } from "react";
import { StateContext } from "../../App";
import { Layout, Typography, Tag, Image, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./Compare.css";

const { Header, Content } = Layout;
const { Title } = Typography;

const Compare = () => {
  const { state, dispatch } = useContext(StateContext);

  const addUser = () =>{
    dispatch({
      type: "OPEN_MODAL",
    })
  }

  const handleOk = () => {
    console.log(1);
  };

  const handleCancel = () => {
    console.log(2);
  };

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
            {state.users.map((user, index) => {
              if (user !== null) {
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
              } else {
                return (
                  <div className="singleUser" key={index}>
                  <div className="emptyUser">
                    <Button type="primary" icon={<PlusOutlined />} onClick={addUser}>
                      Add user
                    </Button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </Content>
      </Layout>

       <Modal title="Basic Modal" visible={state.showModal} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

    </div>
  );
};

export default Compare;
