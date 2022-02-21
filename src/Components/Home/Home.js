import React from "react";
import { Image } from "antd";
import { Form, Input, Button, Checkbox } from "antd";
import "./Home.css";

const Home = () => {

  return (
    <div className="homePage">
        <Image
          className="backgroundImage"
          src="background-img.png"
          alt="background_image"
          preview={false}
        />
      <div className="form">
        <Form
          name="basic"
          labelCol={{
            span: 20,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout ="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Enter Github username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input username!",
              },
            ]}
          >
            <Input placeholder="Username"/>
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
  );
};

export default Home;
