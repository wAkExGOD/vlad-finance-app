import { purchasesSlice } from '../store/reducers/PurchasesSlice';
import { useDispatch } from 'react-redux';

import editIcon from '../assets/icons/edit.svg';
import deleteIcon from '../assets/icons/delete.svg';

export function PurchaseCard({ data: {id, name, category, time, price} }) {
  const { deletePurchase } = purchasesSlice.actions;
  const dispatch = useDispatch();

  const dateObj = new Date(time);
  const dateStr = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;

  return (
    <article key={id} id={id} className="purchase-card">
      <div className="info">
        <h1 className="name">
          <span className="text">{name}</span>
          <span className="category">({category})</span>
        </h1>
        <time className="date" dateTime={time}>
          {dateStr}
        </time>
      </div>
      <div className="price">
        <b>{price}</b> BYN
      </div>
      <div className="manage">
        <div className="edit">
          <img src={editIcon} alt="edit" />
        </div>
        <div className="delete">
          <img src={deleteIcon} alt="delete" onClick={() => dispatch(deletePurchase(id))} />
        </div>
      </div>
    </article>
  );
}