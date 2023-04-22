import React from 'react';
import JobSeekerLogin from './JobSeekerLogin';
import EmployerLogin from './EmployerLogin';
import './Login.scss';

const Login = () => {
  return (
    <div className="login-container">
      <JobSeekerLogin />
      <EmployerLogin />
    </div>
  );
};

export default Login;
