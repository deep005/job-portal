import React, { useContext, useEffect } from 'react';
import AppContext from '../../../store/app-context';
import { useNavigate } from 'react-router-dom';

const Opportunities = props => {
    const appCtx = useContext(AppContext);
    const navigate = useNavigate();


  useEffect(()=>{
    if(appCtx.userProfile !== 'seeker'){
        navigate('/');
    } 
  }, [appCtx, navigate])
  
  return <div>Opportunities</div>;
};

export default Opportunities;
