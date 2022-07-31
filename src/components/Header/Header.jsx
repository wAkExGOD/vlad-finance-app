import { NavLink } from 'react-router-dom';

import settingsIcon from '../../assets/icons/settings.svg';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <NavLink to="/" className="logo">
        <h1>Finance App</h1>
      </NavLink>
      <div className="settings">
        <NavLink to="/settings" className="settings">
          <img src={settingsIcon} alt="Settings" />
        </NavLink>
      </div>
    </header>
  );
}
