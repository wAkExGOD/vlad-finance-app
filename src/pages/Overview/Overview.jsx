import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPurchases, selectPurchases } from '../../store/reducers/PurchasesSlice';
import { selectIsAuth } from '../../store/reducers/AuthSlice';
import { FirstLogIn } from '../../components';
import CategoriesChart from '../../components/OverviewGraphs/CategoriesChart/CategoriesChart';

import styles from './Overview.module.scss';

import { overviewCharts } from '../../constants';

export function Overview() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const purchases = useSelector(selectPurchases);
  const arePurchasesLoading = purchases.status === 'loading';

  useEffect(() => {
    if (isAuth && purchases.status !== 'resolved') {
      dispatch(fetchPurchases());
    }
  }, [isAuth, purchases.status, dispatch]);

  if (!isAuth) {
    return <FirstLogIn />;
  }

  if (arePurchasesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className={['app-section', styles.overview].join(' ')}>
      <CategoriesChart purchases={purchases.items} graphData={overviewCharts.allExpenses} />
    </section>
  );
}
