import React, {useContext} from 'react';

 import Navigation from './Navigation';
import './MainHeader.scss';
import AppContext from '../../store/app-context';

const MainHeader = (props) => {
    const ctx = useContext(AppContext);

  return (
    <header className="main-header">
      {!ctx.userProfile ? <h1>Intuit</h1> : <Navigation /> }
    </header>
  );
};

export default MainHeader;
