import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './Registration.module.scss';
import { fetchRegister, selectIsAuth } from '../../store/reducers/AuthSlice';
import Button from '../../UiKit/Button';
import { ErrorList } from '../../components';

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { status, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const isLoading = status === 'loading';

  return (
    <section className={["app-section", styles.registration].join(' ')}>
      <form
        className={[styles.registration_form, status === 'loading' ? 'loading' : null].join(' ')}
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title">Registration</h1>
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
          <span className="label-name">Your password</span>
          <input
            id="password"
            type="password"
            name="password"
            {...register('password', {
              required: 'Enter your password',
              minLength: {
                value: 8,
                message: 'Minimum password length is 8 characters',
              },
            })}
          />
          {errors?.password && <p className="error-text">{errors?.password?.message || 'Error!'}</p>}
        </label>

        {error.registration && (
          <ErrorList errors={error.registration} />
        )}
        
        <Button
          isLoading={isLoading}
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
          tabIndex="0"
          type="submit">
          Register
        </Button>
      </form>
    </section>
  );
};
