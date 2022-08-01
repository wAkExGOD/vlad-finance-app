import { useSelector } from 'react-redux';
import { generateCategories } from '../../utils';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import styles from './Categories.module.scss';
import { colors } from '../../constants';

ChartJS.register(ArcElement, Tooltip, Legend);


export function Categories() {
  const purchases = useSelector((state) => state.purchases.items);
  const categories = generateCategories(purchases);

  const data = {
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
  const options = { cutout: '60%', responsive: true, maintainAspectRatio: false };

  return (
    <section className={["app-section", styles.categories].join(' ')}>
      <div className={styles.date}>
        <select>
          <option value="last">Last month</option>
        </select>
      </div>

      <div className={styles.categories_block}>
        <h2>Categories</h2>
        <ul>
          {Object.keys(categories).map((category, index) => (
            <li className={styles.category} key={index} style={{ background: colors[index] }}>
              <div className={styles.category_name}>{category}</div>
              <span className={styles.category_expenses}>
                <b>{categories[category].toFixed(2)}</b> BYN
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.circle_statistic}>
        <div className={styles.info}>
          <h2>Expenses</h2>
          <span>
            {Object.values(categories).reduce((total, curr) => (total += curr), 0).toFixed(2)} BYN
          </span>
        </div>
        <div className={styles.circle_container}>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </section>
  );
}
