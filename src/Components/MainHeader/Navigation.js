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
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end
            >
              Profile
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink
              to="/jobs"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end
            >
              Posted Jobs
            </NavLink>
          </li>
        )}
        {ctx.userProfile === 'seeker' ? (
          <li>
            <NavLink
              to="/opportunities"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end
            >
              Opportunities
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
