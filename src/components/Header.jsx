import { NavLink } from 'react-router-dom';

import settingsIcon from '../assets/icons/settings.svg';

export function Header() {
  return (
    <header id="header">
      <NavLink to="/" className="logo">
        <h1>Finances App</h1>
      </NavLink>
      <div className="settings">
        <NavLink to="/settings" className="settings">
          <img src={settingsIcon} alt="Settings" />
        </NavLink>
      </div>
    </header>
  );
}
