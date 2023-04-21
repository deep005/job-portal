import React, {useContext} from 'react';
import AppContext from '../../store/app-context';
import './Navigation.scss';

const Navigation = (props) => {
const ctx = useContext(AppContext);

  return (
    <nav className="nav">
      <ul>
        {ctx.userProfile === 'seeker' ? 
          <li>
            <a href="/">Profile</a>
          </li> : <li>
            <a href="/">Jobs</a>
          </li>
        }
        {ctx.userProfile === 'seeker'? (
          <li>
            <a href="/">Opportunities</a>
          </li> 
        ): null}
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
      </ul>
    </nav>
  );
};

export default Navigation;
