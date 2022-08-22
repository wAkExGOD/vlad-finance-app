import { useDispatch } from 'react-redux';
import { fetchRemovePurchase } from '../../store/reducers/PurchasesSlice';

import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import PurchaseCardLoader from '../Loaders/PurchaseCardLoader';

import styles from './PurchaseCard.module.scss';
import { convertDate } from '../../utils';

export function PurchaseCard(props) {
  const dispatch = useDispatch();
  
  if (props.isLoading) {
    return <PurchaseCardLoader/>;
  }

  const { purchaseId, name, category, time, price } = props.data;
  const date = new convertDate(time);
  
  return (
    <article className={styles.purchase_card}>
      <div className={styles.info}>
        <h1 className={styles.name}>
          <span className={styles.text}>{name}</span>
          <span className={styles.category}>({category})</span>
        </h1>
        <time className={styles.date} dateTime={date.ISOString}>
          {date.dateString}
        </time>
      </div>
      <div className={styles.price}>
        <b>{(+price).toFixed(2)}</b> BYN
      </div>
      <div className={styles.manage}>
        <div className={styles.edit}>
          <img src={editIcon} alt="edit" onClick={() => props.onEditClick(props.data)} />
        </div>
        <div className={styles.delete}>
          <img src={deleteIcon} alt="delete" onClick={() => dispatch(fetchRemovePurchase(purchaseId))} />
        </div>
      </div>
    </article>
  );
}