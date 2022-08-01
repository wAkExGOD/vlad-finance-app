import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './LogIn.module.scss';
import { fetchAuth, selectIsAuth } from '../../store/reducers/AuthSlice';

export function LogIn() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (values) => {
    const data = dispatch(fetchAuth(values));

    if (!data.payload) {
      alert('Не удалось авторизоваться');
      return;
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <section className={["app-section", styles["app-section"]].join(' ')}>
      <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <label htmlFor="email">
          <span className="label-name">E-Mail</span>
          <input
            autoComplete="off"
            id="email"
            type="email"
            name="email"
            {...register('email', { required: 'Enter the E-Mail' })}
          />
          {errors?.email && <p className="error-text">{errors?.email?.message || 'Error!'}</p>}
        </label>

        <label htmlFor="password">
          <span className="label-name">Password</span>
          <input
            autoComplete="off"
            id="password"
            type="password"
            name="password"
            {...register('password', {
              required: 'Enter the password',
              minLength: {
                value: 3,
                message: 'Minimum password length is 3 characters',
              },
              maxLength: {
                value: 36,
                message: 'Maximum password length is 36 characters',
              },
            })}
          />
          {errors?.password && <p className="error-text">{errors?.password?.message || 'Error!'}</p>}
        </label>
        <input className="btn contained" type="submit" value="Log in" disabled={!isValid} />
      </form>
    </section>
  );
}
