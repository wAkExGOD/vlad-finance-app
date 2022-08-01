import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectIsAuth } from '../../store/reducers/AuthSlice';

import { Button } from '../../components';

import settingsIcon from '../../assets/icons/settings.svg';
import styles from './Header.module.scss';

export function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Do you really want to log out?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <header className={styles.header}>
      <Link to="/" className="logo">
        <h1>Finance App</h1>
      </Link>
      <div className={styles.buttons}>
        {isAuth ? (
          <Button variant="outlined" className={styles.button} onClick={onClickLogout}>Log out</Button>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outlined" className={styles.button}>Log in</Button>
            </Link>
            <Link to="/register">
              <Button variant="outlined" className={styles.button}>Create an account</Button>
            </Link>
          </>
        )}
      </div>
      <Link to="/settings" className="settings">
        <img src={settingsIcon} alt="Settings" />
      </Link>
    </header>
  );
}
