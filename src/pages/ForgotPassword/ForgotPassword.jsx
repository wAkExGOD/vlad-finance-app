import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from '../../axios';
import { selectIsAuth } from '../../store/reducers/AuthSlice';
import Dialog from '../../UiKit/Dialog';

export function ForgotPassword(props) {
  const isAuth = useSelector(selectIsAuth);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [onCloseHandler, setOnCloseHandler] = useState(() => {});
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async ({ email }) => {
    // const data = await dispatch(fetchAuth(values));

    // console.log(data);

    // if (!data.payload) {
    //   reset();
    //   return alert('Не удалось авторизоваться');
    // }

    // if ('token' in data.payload) {
    //   window.localStorage.setItem('token', data.payload.token);
    // }

    const { data } = await axios.post('/auth/forgot-password', { email });
    console.log(data);
    if (data.success) {
      setDialogText('Success! Check your email. We sent a link to change your password.');
      setOnCloseHandler(() => {
        return <Navigate to="/" />;
      });
    } else {
      setDialogText('Oops! There is an error.');
      setOnCloseHandler(setIsDialogOpened(false));
    }
    setIsDialogOpened(true);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <p>Enter your email. We will send you a link to change password.</p>
        <label htmlFor="email">
          <span className="label-name">Your email</span>
          <input
            id="email"
            type="email"
            name="email"
            {...register('email', { required: 'Enter the email' })}
          />
          {errors?.email && (
            <p className="error-text">{errors?.email?.message || 'Error!'}</p>
          )}
        </label>

        <input className="btn contained" type="submit" value="Submit" disabled={!isValid} />
      </form>

      <Dialog
        isOpened={isDialogOpened}
        text={dialogText}
        onClose={onCloseHandler}
        primaryButtonText={'OK'}
        primaryButtonOnClick={onCloseHandler}
      />
    </>
  );
}
