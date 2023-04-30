import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Input, Card } from "antd";
import AppContext from "../../store/app-context";
import { useNavigate } from "react-router-dom";
import { validateLoginDetails } from "../../Utils/AppUtils";

const JobSeekerLogin = (props) => {
  const { onLoginFail } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  //useEffect to check if the userProfile is set to seeker either in the app context or local storage
  useEffect(() => {
    if (appCtx.userProfile === "seeker") {
      navigate("/profile");
    } else {
      const userProfileLocal = localStorage.getItem("userProfile");
      if (userProfileLocal && userProfileLocal === "seeker") {
        navigate("/profile");
      }
    }
  }, [appCtx, navigate]);

  //triggered on form submission
  const onClickHandler = () => {
    const values = { ...form.getFieldValue() };
    const validateStatus = validateLoginDetails(values, "seeker");
    if (validateStatus) {
      localStorage.setItem("userProfile", "seeker");
      appCtx.onLogin("seeker");
      navigate("/profile");
    } else {
      onLoginFail();
      const loginObj = {
        username: "",
        password: "",
      };
      form.setFieldsValue(loginObj);
      setUserName("");
      setPassword("");
    }
  };

  //triggered on form value change
  const onValuesChange = (values) => {

    values.username
      ? setUserName(values.username || "")
      : setPassword(values.password || "");
  };

  return (
    <div className="seeker-form">
    <Card
      title="Job Seeker"
      bordered={false}
      style={{
        width: 400,
        height: 400,
        boxShadow: "0px 2px 5px 0px rgba(56,43,56,1)",
      }}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, paddingTop: 30 }}
        onValuesChange={onValuesChange}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {userName.length && password.length ? (
            <Button
              type="primary"
              htmlType="submit"
              onClick={onClickHandler}
              style={{
                background: "#33B566",
                marginTop: 30,
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              disabled
              style={{
                marginTop: 30,
              }}
            >
              Login
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
    </div>
  );
};

export default JobSeekerLogin;
