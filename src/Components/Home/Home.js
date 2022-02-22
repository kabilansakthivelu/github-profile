import React, { useContext, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import { StateContext } from "../../App";
import { Image, notification } from "antd";
import { Form, Input, Button, Checkbox } from "antd";
import "./Home.css";

const Home = () => {
  const { state, dispatch } = useContext(StateContext);

  const navigate = useNavigate();

  const usernameRef = useRef();

  const openNotification = () => {
  notification.open({
    message: 'Error',
    description:
      'Please enter a valid username',
      className: "notification",
  });
};

  const fetchUserData = async(username) =>{
    const resp = await fetch(`https://api.github.com/users/${username}`);
    const data = await resp.json();
    if(!data.message){
      navigate("/compare");
      console.log(data);
      dispatch({
        type: "ADD_USER",
        payload: data,
      })
    }
    else{
      openNotification();
    }
  }

  const submitUser = () =>{
    fetchUserData(usernameRef.current.props.value);
  }

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
              <Input placeholder="Username" ref={usernameRef}/>
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
