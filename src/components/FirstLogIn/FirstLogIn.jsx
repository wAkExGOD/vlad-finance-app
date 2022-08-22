import { NavLink } from 'react-router-dom';
import styles from './FirstLogIn.module.scss';

export function FirstLogIn() {
  return (
    <div className={styles.first_login}>
      <span>
        First of all you should <NavLink className="dashed" to="/login">log in</NavLink>
      </span>
    </div>
  )
}