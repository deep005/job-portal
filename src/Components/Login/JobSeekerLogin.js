import React, {useState, useContext} from 'react';
import { Button, Form, Input, Card } from 'antd';
import AppContext from '../../store/app-context';
import { useNavigate } from 'react-router-dom';


const JobSeekerLogin = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState(''); 
    const ctx = useContext(AppContext);
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        localStorage.setItem('userProfile', 'seeker');
        ctx.onLogin('seeker');
        navigate('/profile');
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
        title="Job Seeker"
        bordered={false}
        style={{ width: 400, 
          height: 400,
          boxShadow: "0px 2px 5px 0px rgba(56,43,56,1)",
          marginRight: "5rem"
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
  
  export default JobSeekerLogin;
  
  