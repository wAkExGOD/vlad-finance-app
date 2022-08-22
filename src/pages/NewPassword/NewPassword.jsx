import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import Dialog from '../../UiKit/Dialog';

export function NewPassword() {
  const navigate = useNavigate();
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isDialogValid, setDialogValid] = useState(true);
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      password: '',
    },
    mode: 'onChange',
  });
  const { key } = useParams();

  if (!key) {
    return <Navigate to="/" />;
  }

  const onSubmit = async ({ password }) => {
    const { data } = await axios.post('/auth/new-password', { password, key });
    console.log(data);

    if (data.success) {
      // setDialogText('Success! Password has been changed.');
      // function close() {
      //   return navigate("/login", { replace: true });
      // }
      // setOnCloseHandler(close);
      // перебрасывает сразу. Но нужно, чтоб перебрасывало только при клике на OK в модалке-диалоге
    } else {
      // setDialogText('Oops! There is an error.');
      // setOnCloseHandler(setIsDialogOpened(false));
    }
    setIsDialogOpened(true);

    // return <Navigate to="/login" />;
  };


  const dialogText = isDialogValid ? 'Success! Password has been changed.' : 'Oops! There is an error.';
  const btnText = isDialogValid ? 'Log in' : 'Try again';
  const onCloseHandler = isDialogValid ? () => navigate("/login", { replace: true }) : setIsDialogOpened(false);
  return (
    <section className="app-section">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <label htmlFor="password">
          <span className="label-name">Enter a new password</span>
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

        <input className="btn contained" type="submit" value="Update" disabled={!isValid} />
      </form>

      <Dialog
        isOpened={isDialogOpened}
        text={dialogText}
        // onClose={() => navigate("/login", { replace: true })}
        onClose={onCloseHandler}
        primaryButtonText={btnText}
        primaryButtonOnClick={onCloseHandler}
      />
    </section>
  );
}
