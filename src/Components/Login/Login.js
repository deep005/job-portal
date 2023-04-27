import React from "react";
import JobSeekerLogin from "./JobSeekerLogin";
import EmployerLogin from "./EmployerLogin";
import "./Login.scss";
import { notification } from "antd";

const Login = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Error",
      duration: 5,
      description: "Please enter a valid username and password!",
    });
  };

  return (
    <>
      {contextHolder}
      <div className="login-container">
        <JobSeekerLogin
          onLoginFail={openNotificationWithIcon.bind(null, "error")}
        />
        <EmployerLogin
          onLoginFail={openNotificationWithIcon.bind(null, "error")}
        />
      </div>
    </>
  );
};

export default Login;
