import { useForm } from 'react-hook-form';
import { categories } from '../constants';

export function AddPurchaseForm(props) {
  const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm({ mode: "onChange" });

  return (
    <form
      id="add-purchase"
      onSubmit={handleSubmit((data) => {
        props.handleSubmit(data); reset();
      })}>
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
          placeholder="Bread"
        />
        {errors?.name && <p className="error-text">{errors?.name?.message || 'Error!'}</p>}
      </label>
      <label htmlFor="purchase-category">
        <span className="label-name">Product category</span>
        <select
          id="purchase-category"
          className="label-input"
          {...register('category', { required: 'Select the product category' })}>
          <option value="">Select category...</option>
          {categories.map(name => (
            <option value={name}>{name}</option>
          ))}
        </select>
        {errors?.category && <p className="error-text">{errors?.category?.message || 'Error!'}</p>}
      </label>
      <label htmlFor="purchase-price">
        <span className="label-name">Product price</span>
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
          placeholder="2.5 BYN..."
          type="text"
        />
        {errors?.price && <p className="error-text">{errors?.price?.message || 'Error'}</p>}
      </label>
      <input className="btn contained" type="submit" value="Add" disabled={!isValid} />
    </form>
  );
}
