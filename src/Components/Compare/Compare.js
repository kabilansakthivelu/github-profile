import React, { useContext } from "react";
import { StateContext } from "../../App";
import { Layout, Typography, Tag, Image, Button, Modal, Input } from "antd";
import { PlusOutlined, StarFilled } from "@ant-design/icons";
import "./Compare.css";

const { Header, Content } = Layout;
const { Title } = Typography;

const Compare = () => {
  const { state, dispatch, fetchUserData, newUserNameRef } = useContext(StateContext);

  const addUser = () =>{
    dispatch({
      type: "OPEN_MODAL",
    })
  }

  const handleOk = () => {
    fetchUserData(newUserNameRef.current.state.value);
    newUserNameRef.current.state.value = "";
  };

  const handleCancel = () => {
    dispatch({
      type: "CLOSE_MODAL",
    })
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
               <p className="fieldLabel">Stars</p>
              <p className="fieldLabel">Languages</p>
            </div>
            {state.users.map((user, index) => {
              if (user !== null) {
                return (
                  <div key={user.id} className="singleUser">
                  <Button type="link" danger className="removeLink">Remove</Button>
                    <div className="userAvatarContainer">
                      <div>
                        <Image
                          src={user.info.avatar_url}
                          alt={user.id}
                          className="userAvatar"
                        />
                      </div>
                    </div>
                    <p>{user.info.name || "-"}</p>
                    <p>{user.info.company || "-"}</p>
                    <p>{user.info.location || "-"}</p>
                    <p>{user.info.followers}</p>
                    <p>{user.info.following}</p>
                    <p>{user.info.public_repos}</p>
                    <p>{user.info.created_at.slice(0, 10)}</p>
                    <p>{user.moreUserInfo.stargazers_count} <StarFilled className="starIcon"/></p>
                    {user.moreUserInfo.favLanguage.map((item)=>{
                      if(item !== "null"){
                        return <Tag className="languageTag" color="blue">{item}</Tag>
                      }
                    })}
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

       <Modal title="Enter Github username" visible={state.showModal} onOk={handleOk} onCancel={handleCancel}>
         <Input placeholder="Username" ref={newUserNameRef}/>
      </Modal>

    </div>
  );
};

export default Compare;
