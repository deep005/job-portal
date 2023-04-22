import React, { useContext, useEffect } from 'react';
import AppContext from '../../store/app-context';
import { useNavigate } from 'react-router-dom';


const UserProfile = props => {
const appCtx = useContext(AppContext);
const navigate = useNavigate();

useEffect(()=>{
    if(appCtx.userProfile !== 'seeker'){
        navigate('/');
    } 
  }, [appCtx, navigate])


  return <div>UserProfile</div>;
};

export default UserProfile;
