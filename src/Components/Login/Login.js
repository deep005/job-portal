import React, {useContext} from 'react';
import JobSeekerLogin from './JobSeekerLogin';
import EmployerLogin from './EmployerLogin';
import AppContext from '../../store/app-context';

const Login = () => {
    const ctx = useContext(AppContext);
    console.log("####",ctx);
  return (
    <>
    <JobSeekerLogin />
    <EmployerLogin />
  </>
  );
};

export default Login;
