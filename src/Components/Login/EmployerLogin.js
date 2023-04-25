import React, {useState, useContext, useEffect } from 'react';
import AppContext from '../../store/app-context';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Card } from 'antd';


const EmployerLogin = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState(''); 
    const appCtx = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (appCtx.userProfile !== 'employer') {
        const userProfileLocal = localStorage.getItem("userProfile");
        if(userProfileLocal && userProfileLocal === 'employer'){
          navigate('/jobs');
        }
      }
      if(appCtx.userProfile === 'employer'){
        navigate('/jobs');
      }
    }, [appCtx, navigate]);

    const onFinish = (values) => {
        console.log('Success:', values);
        localStorage.setItem('userProfile', 'employer');
        appCtx.onLogin('employer');
        navigate('/jobs');
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      const onValuesChange = (values) => {
        console.log('Failed:', values);
        
        values.username ? setUserName(values.username || '') : setPassword(values.password || '')
      }
    return (
      <Card
      title="Employer"
      bordered={false}
      style={{ width: 400, 
        height: 400,
        boxShadow: "0px 2px 5px 0px rgba(56,43,56,1)"
  
     }}
    >
      <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600, paddingTop: 30 }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    onValuesChange={onValuesChange}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please enter your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please enter your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    {userName.length && password.length ?
      <Button type="primary" htmlType="submit" style={{
        background:"#33B566",
        marginTop: 30
      }}>
        Submit
      </Button> : 
      <Button disabled style={{
        marginTop: 30
      }}>
        Submit
      </Button> }
    </Form.Item>
  </Form>
    </Card>
    );
  };
  
  export default EmployerLogin;
  