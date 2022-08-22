import { useState, useEffect } from 'react';
import {
  AddPurchaseForm,
  EditPurchaseForm,
  FirstLogIn,
  Pagination,
  PurchaseCard,
} from '../../components';
import Button from '../../UiKit/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddPurchase, fetchPurchases, selectPurchases } from '../../store/reducers/PurchasesSlice';
import { selectIsAuth } from '../../store/reducers/AuthSlice';
import { sortPurchases, getElementsByPagination } from '../../utils';
import { sortingPurchasesOptions, screenSizes } from '../../constants';
import styles from './Purchases.module.scss';
import MainPopup from '../../UiKit/MainPopup';

export function Purchases() {
  const dispatch = useDispatch();
  
  const getElementsCount = () => {
    const width = document.documentElement.clientWidth;

    if (width > screenSizes.large) {
      return 9;
    } else if (width > screenSizes.medium) {
      return 6;
    } else if (width > screenSizes.small) {
      return 8;
    } else {
      return 4;
    }
  }

  const [addModalActive, setAddModalActive] = useState(false);
  const [editModalActive, setEditModalActive] = useState(false);
  const [editPurchaseData, setEditPurchaseData] = useState({});

  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(getElementsCount());

  const [sortBy, setSortBy] = useState(Object.keys(sortingPurchasesOptions)[0]);
  const purchases = useSelector(selectPurchases);
  const arePurchasesLoading = purchases.status === 'loading';
  const isAuth = useSelector(selectIsAuth);

  const addNewPurchase = async ({ name, category, price }) => {
    try {
      const data = await dispatch(fetchAddPurchase({ name, category, price }));
      console.log(data);

      setAddModalActive(false);

      dispatch(fetchPurchases());
    } catch (error) {
      console.warn(error);
    }
  };

  const openEditModal = (data) => {
    setEditPurchaseData(data);
    setEditModalActive(true);
  };

  useEffect(() => {
    if (isAuth && purchases.status !== 'resolved') {
      dispatch(fetchPurchases());
    }
  }, [isAuth, purchases.status, dispatch]);



  useEffect(() => {
    const listener = () => {
      setPerPage(getElementsCount());
    }

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    }
  }, [])

  if (!isAuth) {
    return <FirstLogIn />;
  }

  const purchasesArr = getElementsByPagination(
    sortPurchases(purchases.items, sortBy),
    perPage,
    pageNumber,
  );

  return (
    <section className={['app-section', styles.purchases].join(' ')}>
      <div className={styles.add_purchase}>
        <Button type="red" onClick={() => setAddModalActive(true)} disabled={arePurchasesLoading}>
          <div>+</div>
          <div>Add new purchase</div>
        </Button>
      </div>
      <div className={styles.last_purchases}>
        <div className={styles.sort}>
          <label htmlFor="sort-param">
            <span>Sorted by</span>
            <select id="sort-param" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {Object.keys(sortingPurchasesOptions).map((sortValue, index) => (
                <option key={index} value={sortValue}>
                  {sortingPurchasesOptions[sortValue].text}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.container}>
          {arePurchasesLoading &&
            [...Array(6)].map((_, index) => <PurchaseCard key={index} isLoading={true} />)}
          {!arePurchasesLoading &&
            (purchases.items.length > 0 ? (
              purchasesArr.map((obj, index) => (
                <PurchaseCard
                  onEditClick={() => openEditModal(obj)}
                  key={obj.purchaseId}
                  data={obj}
                />
              ))
            ) : (
              <div>You have no purchases</div>
            ))}
        </div>

        {!arePurchasesLoading && purchases.items.length > 0 && (
          <Pagination
            className={[styles.pagination]}
            count={purchases.items.length}
            perPage={perPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        )}
      </div>

      <MainPopup isOpened={addModalActive} onClose={() => setAddModalActive(false)} title="Add purchase">
        <AddPurchaseForm handleSubmit={addNewPurchase} />
      </MainPopup>

      <MainPopup isOpened={editModalActive} onClose={() => setEditModalActive(false)}>
        <EditPurchaseForm
          data={editPurchaseData}
          closeModal={() => setEditModalActive(false)}
        />
      </MainPopup>
    </section>
  );
}
