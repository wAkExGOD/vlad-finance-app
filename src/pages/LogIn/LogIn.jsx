import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './LogIn.module.scss';
import { fetchAuth, selectIsAuth } from '../../store/reducers/AuthSlice';
import { ForgotPassword } from '../ForgotPassword';
import MainPopup from '../../UiKit/MainPopup';
import Button from '../../UiKit/Button';
import { ErrorList } from '../../components';

export function LogIn() {
  const isAuth = useSelector(selectIsAuth);
  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isForgotPasswordOpened, setIsForgotPasswordOpened] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const isLoading = status === 'loading';

  return (
    <section className={['app-section', styles.login].join(' ')}>
      <form
        className={[styles.login_form, status === 'loading' ? 'loading' : null].join(' ')}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off">
        <h1 className={styles.title}>Authorization</h1>

        <label htmlFor="email">
          <span className="label-name">E-Mail</span>
          <input
            id="email"
            type="email"
            name="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
              maxLength: {
                value: 100,
                message: 'Enter the correct profile email',
              },
            })}
          />
          {errors?.email && <p className="error-text">{errors?.email?.message || 'Error!'}</p>}
        </label>

        <label htmlFor="password">
          <span className="label-name">Password</span>
          <input
            id="password"
            type="password"
            name="password"
            {...register('password', {
              required: 'Enter the password',
              minLength: {
                value: 8,
                message: 'Minimum password length is 8 characters',
              },
            })}
          />
          {errors?.password && (
            <p className="error-text">{errors?.password?.message || 'Error!'}</p>
          )}
        </label>

        {error.login && (
          <ErrorList errors={error.login} />
        )}

        <div>
          <span
            className={['dashed', styles.forgot_btn].join(' ')}
            onClick={() => setIsForgotPasswordOpened(true)}>
            Forgot password?
          </span>
        </div>

        <Button
          isLoading={isLoading}
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
          tabIndex="0"
          type="submit">
          Log in
        </Button>
      </form>

      <MainPopup
        title="Change password"
        isOpened={isForgotPasswordOpened}
        onClose={() => setIsForgotPasswordOpened(false)}>
        <ForgotPassword />
      </MainPopup>
    </section>
  );
}
