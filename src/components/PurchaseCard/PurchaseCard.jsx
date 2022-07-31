import { purchasesSlice } from '../../store/reducers/PurchasesSlice';
import { useDispatch } from 'react-redux';

import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';

import styles from './PurchaseCard.module.scss';

export function PurchaseCard({ data: {id, name, category, time, price} }) {
  const { deletePurchase } = purchasesSlice.actions;
  const dispatch = useDispatch();

  const dateObj = new Date(time);
  const dateStr = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;

  return (
    <article key={id} className={styles.purchase_card}>
      <div className={styles.info}>
        <h1 className={styles.name}>
          <span className={styles.text}>{name}</span>
          <span className={styles.category}>({category})</span>
        </h1>
        <time className={styles.date} dateTime={time}>
          {dateStr}
        </time>
      </div>
      <div className={styles.price}>
        <b>{price}</b> BYN
      </div>
      <div className={styles.manage}>
        <div className={styles.edit}>
          <img src={editIcon} alt="edit" />
        </div>
        <div className={styles.delete}>
          <img src={deleteIcon} alt="delete" onClick={() => dispatch(deletePurchase(id))} />
        </div>
      </div>
    </article>
  );
}