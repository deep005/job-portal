import React, { useContext, useEffect } from 'react';
import AppContext from '../../store/app-context';
import { useNavigate } from 'react-router-dom';

const Jobs = props => {
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (appCtx.userProfile !== 'employer') {
      navigate('/');
    }
  }, [appCtx, navigate]);

  return <div>Jobs</div>;
};

export default Jobs;
