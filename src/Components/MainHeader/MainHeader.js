import React, {useContext , useState, useLayoutEffect} from 'react';

 import Navigation from './Navigation';
import './MainHeader.scss';
import AppContext from '../../store/app-context';

const MainHeader = (props) => {
    const [userProfile, setUserProfile] = useState('');
    const appCtx = useContext(AppContext);

    useLayoutEffect(() => {
      let userProfileLocal = appCtx.userProfile;
      if(!userProfileLocal){
        userProfileLocal = localStorage.getItem("userProfile");
      }
      if(!userProfileLocal){
        setUserProfile('')
      }else{
        appCtx.onLogin(userProfileLocal);
        setUserProfile(userProfileLocal)
      }

    }, [appCtx]);

  return (
    <header className="main-header">
      {!userProfile ? <h1>Intuit</h1> : <Navigation /> }
    </header>
  );
};

export default MainHeader;
