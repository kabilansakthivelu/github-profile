import React, { useContext } from "react";
import { StateContext } from "../../App";
import { Image, notification, Form, Input, Button } from "antd";
import "./Home.css";

const Home = () => {
  const { state, usernameRef, submitUser } = useContext(StateContext);

  return (
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
            onFinish={submitUser}
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
  );
};

export default Home;
