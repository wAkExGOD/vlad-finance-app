import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from '../../store/reducers/AuthSlice';
import { ErrorList, FirstLogIn } from '../../components';
import Button from '../../UiKit/Button';
import { convertDate } from '../../utils';
import axios from '../../axios';
import styles from './Settings.module.scss';

export function Settings() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const isAuth = useSelector(selectIsAuth);
  const authData = useSelector((state) => state.auth.data);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    // reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    try {
      setIsLoading(true);
      axios
        .patch('/profile/edit', data)
        .then((data) => {
          console.log(data);
          dispatch(fetchAuthMe());
        })
        .catch((data) => {
          console.warn(data);
          setFormErrors(data.response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.warn(error);
    }
  };

  if (!isAuth) {
    return <FirstLogIn />;
  }

  return (
    <section className={['app-section', styles.settings].join(' ')}>
      <Button
        className={styles.edit}
        variant={isEditing ? 'outlined' : 'contained'}
        onClick={() => setIsEditing(!isEditing ? true : false)}>
        {isEditing ? 'Info' : 'Edit'}
      </Button>
      {isEditing ? (
        <form
          id="edit_profile"
          className={isLoading ? 'loading' : null}
          onSubmit={handleSubmit((data) => onSubmit(data))}
          autoComplete="off">
          <h1 className={['title', styles.title].join(' ')}>Edit profile</h1>
          <label htmlFor="profile-name">
            <span className="label-name">Profile name</span>
            <input
              id="profile-name"
              className="label-input"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Minimum count of name is 2 characters',
                },
                maxLength: {
                  value: 64,
                  message: 'Maximum count of name is 64 characters',
                },
              })}
              type="text"
              defaultValue={authData.name}
            />
            {errors?.name && <p className="error-text">{errors?.name?.message || 'Error!'}</p>}
          </label>

          {formErrors.length > 0 && <ErrorList errors={formErrors} />}

          <Button
            isLoading={isLoading}
            onClick={handleSubmit((data) => onSubmit(data))}
            className="btn contained"
            value="Update"
            disabled={!isValid || isLoading}
            tabIndex="0">
            Update
          </Button>
        </form>
      ) : (
        <div className={styles.info}>
          <h1 className={styles.title}>Profile info</h1>
          <ul className={styles.list}>
            <li className={styles.item}>
              ID: <span>{authData.userId}</span>
            </li>
            <li className={styles.item}>
              Name: <span>{authData.name}</span>
            </li>
            <li className={styles.item}>
              Registered: <span>{new convertDate(authData.registeredTime).dateString}</span>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
