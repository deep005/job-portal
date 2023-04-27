import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AppContext from '../../store/app-context';
import './Navigation.scss';

const Navigation = props => {
  const ctx = useContext(AppContext);
  return (
    <nav className="nav">
      <ul>
        {ctx.userProfile === 'seeker' ? (
          <li key="profile1">
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end
            >
              Profile
            </NavLink>
          </li>
        ) : null}
        {ctx.userProfile === 'seeker' && ctx.userDataFilled? (
          <li key="opportunities">
            <NavLink
              to="/opportunities"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end
            >
              Opportunities
            </NavLink>
          </li>
        ) : null}
        {ctx.userProfile !== 'seeker' ? (
          <li key="jobs">
            <NavLink
              to="/jobs"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end
            >
              Posted Jobs
            </NavLink>
          </li>
        ) : null}
        
      </ul>
      <ul>
        <li>
          <button onClick={ctx.onLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
