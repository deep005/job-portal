import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '../../../store/app-context';
import { useNavigate } from 'react-router-dom';

const Opportunities = props => {
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const [opprotunities, setOpportunities] = useState([]);
  const [filterSkills, setFilterSkills] = useState('');
  const [filterMinSalary, setFilterMinSlary] = useState('');
  const currentPage = useRef(0);
  const nextScroll = useRef(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    if(appCtx.userProfile !== 'seeker'){
        navigate('/');
    } 
  }, [appCtx, navigate]);


  
  return <div>Opportunities</div>;
};


export default Opportunities;
