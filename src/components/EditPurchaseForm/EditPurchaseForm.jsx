import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { categories } from '../../constants';
import Button from '../../UiKit/Button';
import { fetchPurchases } from '../../store/reducers/PurchasesSlice';
import axios from '../../axios';

export function EditPurchaseForm(props) {
  const dispatch = useDispatch();
  const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm({ mode: "onChange" });
  const [ isLoading, setLoading ] = useState(false);
  const { purchaseId, name, category, price } = props.data;

  useEffect(() => {
    const defaultValues = {name, category, price};
    reset({ ...defaultValues });
  }, []);

  const onSubmit = async (purchaseData) => {
    try {
      setLoading(true);

      const editedPurchase = {
        name: purchaseData.name,
        category: purchaseData.category,
        price: parseFloat(purchaseData.price).toFixed(2),
      };

      const { data } = await axios.patch(`/purchases/${purchaseId}`, editedPurchase);

      setLoading(false);

      console.log(data);
      props.closeModal();

      dispatch(fetchPurchases());
    } catch (error) {
      console.warn('There is an error', error);
      setLoading(false);
    }
  };

  return (
    <form
      id="edit_purchase"
      className={isLoading ? 'loading' : null}
      onSubmit={handleSubmit((data) => onSubmit(data))}
      autoComplete="off">
      <label htmlFor="purchase-name">
        <span className="label-name">Product name</span>
        <input
          id="purchase-name"
          className="label-input"
          {...register('name', {
            required: 'Enter the product name',
            minLength: {
              value: 3,
              message: 'Enter the correct product name',
            },
            maxLength: {
              value: 100,
              message: 'Enter the correct product name',
            },
          })}
          type="text"
        />
        {errors?.name && <p className="error-text">{errors?.name?.message || 'Error!'}</p>}
      </label>
      <label htmlFor="purchase-category">
        <span className="label-name">Product category</span>
        <select
          id="purchase-category"
          className="label-input"
          {...register('category', { required: 'Select the product category' })}>
          {categories.map((name, index) => (
            <option value={name} key={index}>{name}</option>
          ))}
        </select>
        {errors?.category && <p className="error-text">{errors?.category?.message || 'Error!'}</p>}
      </label>
      <label htmlFor="purchase-price">
        <span className="label-name">Product price (in BYN)</span>
        <input
          id="purchase-price"
          className="label-input"
          {...register('price', {
            required: 'Enter the product price',
            validate: (value) => parseFloat(value) > 0,
            minLength: {
              value: 1,
              message: 'Enter the correct product price',
            },
            maxLength: {
              value: 100,
              message: 'Enter the correct product price',
            },
          })}
          type="text"
        />
        {errors?.price && <p className="error-text">{errors?.price?.message || 'Error'}</p>}
      </label>
      <Button
        onClick={handleSubmit((data) => onSubmit(data))}
        isLoading={isLoading}
        className="btn contained"
        type="submit"
        disabled={!isValid}>
        Edit
      </Button>
    </form>
  );
}