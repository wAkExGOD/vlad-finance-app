import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generateCategories } from '../../utils';
import { fetchPurchases, selectPurchases } from '../../store/reducers/PurchasesSlice';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import styles from './Categories.module.scss';
import { colors } from '../../constants';
import { selectIsAuth } from '../../store/reducers/AuthSlice';
import { FirstLogIn } from '../../components';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Categories() {
  const sortingOptions = [
    { name: 'day', text: 'Last day' },
    { name: 'week', text: 'Last week' },
    { name: 'month', text: 'Last month' },
    { name: 'year', text: 'Last year' },
  ];
  const dispatch = useDispatch();

  const purchases = useSelector(selectPurchases);
  const arePurchasesLoading = purchases.status === 'loading';
  const isAuth = useSelector(selectIsAuth);
  
  const [timeRange, setTimeRange] = useState(sortingOptions[0].name);
  const categories = generateCategories(purchases.items, timeRange);

  const chartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Money spent',
        data: Object.keys(categories).map((name) => categories[name]),
        backgroundColor: colors.map((color) => color),
        borderWidth: 2,
        spacing: 0,
        borderAlign: 'inner',
      },
    ],
  };
  const chartOptions = { cutout: '60%', responsive: true, maintainAspectRatio: false };

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
    <section className={['app-section', styles.categories].join(' ')}>
      <div className={styles.date}>
        <select defaultValue={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          {sortingOptions.map(({ name, text }, index) => (
            <option value={name} key={index}>
              {text}
            </option>
          ))}
        </select>
      </div>

      {Object.keys(categories).length > 0 ? (
        <>
          <div className={styles.categories_block}>
            <h2>Categories</h2>
            <ul>
              {Object.keys(categories).map((category, index) => (
                <li className={styles.category} key={index} style={{ background: colors[index] }}>
                  <div className={styles.category_name}>{category}</div>
                  <span className={styles.category_expenses}>
                    <b>{(+categories[category]).toFixed(2)}</b> BYN
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.circle_statistic}>
            <div className={styles.info}>
              <h2>Expenses</h2>
              <span>
                {Object.values(categories)
                  .reduce((total, curr) => (total += +curr), 0)
                  .toFixed(2)}{' '}
                BYN
              </span>
            </div>
            <div className={styles.circle_container}>
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </>
      ) : (
        <div>You don't have any purchases in this period</div>
      )}
    </section>
  );
}
