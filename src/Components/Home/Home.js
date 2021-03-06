import React, { useContext } from "react";
import { StateContext } from "../../App";
import { Image, notification, Form, Input, Button, Spin } from "antd";
import "./Home.css";

const Home = () => {
  const { state, usernameRef, fetchUserData, spin } = useContext(StateContext);

  return (
    <Spin spinning={spin}>
    <div className="homePage">
      {!state.isMobileView && (
        <Image
          className="backgroundImage"
          src="background-img.png"
          alt="background_image"
          preview={false}
        />
      )}
      <div className="formSection">
        <div className="form">
          <Form
            name="basic"
            labelCol={{
              span: 40,
            }}
            wrapperCol={{
              span: 60,
            }}
            layout="vertical"
            requiredMark={false}
            onFinish={()=>{fetchUserData(usernameRef.current.props.value)}}
          >
            <Form.Item
              label="Enter Github username"
              name="username"
              className="usernameLabel"
              rules={[
                {
                  required: true,
                  message: "Please input username!",
                },
              ]}
            >
              <Input placeholder="Username" ref={usernameRef} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
    </Spin>
  );
};

export default Home;
