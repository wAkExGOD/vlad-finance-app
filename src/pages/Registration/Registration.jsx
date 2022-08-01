import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './Registration.module.scss';
import { fetchRegister, selectIsAuth } from '../../store/reducers/AuthSlice';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(values);

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <section className={["app-section", styles.registration].join(' ')}>
      <h1 className={styles.title}>Registration</h1>
      <form className={styles.registration_form} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <label htmlFor="name">
          <span className="label-name">Your name</span>
          <input
            autoComplete="off"
            id="name"
            type="name"
            name="name"
            {...register('name', { required: 'Enter your name' })}
          />
          {errors?.name && <p className="error-text">{errors?.name?.message || 'Error!'}</p>}
        </label>
        <label htmlFor="email">
          <span className="label-name">Your email</span>
          <input
            autoComplete="off"
            id="email"
            type="email"
            name="email"
            {...register('email', { required: 'Enter your email' })}
          />
          {errors?.email && <p className="error-text">{errors?.email?.message || 'Error!'}</p>}
        </label>
        <label htmlFor="password">
          <span className="label-name">Your password</span>
          <input
            id="password"
            type="password"
            name="password"
            {...register('password', {
              required: 'Enter your password',
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
        <input className="btn contained" type="submit" value="Register" disabled={!isValid} />
      </form>
    </section>
  );
};
