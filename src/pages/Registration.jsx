import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { fetchRegister, selectIsAuth } from '../store/reducers/AuthSlice';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        error={Boolean(errors.name?.message)}
        helperText={errors.name?.message}
        {...register('name', { required: 'Укажите никнейм' })}
        placeholder="Nickname"
      />
      <input
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', { required: 'Укажите почту' })}
        placeholder="E-Mail"
      />
      <input
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password', { required: 'Укажите пароль' })}
        placeholder="Password"
      />
      <button type="submit" disabled={!isValid}>
        Зарегистрироваться
      </button>
    </form>
  );
};