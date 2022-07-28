import { useSelector } from 'react-redux';
import { generateCategories } from '../utils';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { colors } from '../constants';

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
    <section className="app-section" id="categories">
      <div className="date">
        <select>
          <option value="last">Last month</option>
        </select>
      </div>

      <div className="categories">
        <h2>Categories</h2>
        <ul>
          {Object.keys(categories).map((category, index) => (
            <li className="category" key={index} style={{ background: colors[index] }}>
              <div className="category-name">{category}</div>
              <span className="category-expenses">
                <b>{categories[category].toFixed(2)}</b> BYN
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="circle-statistic">
        <div className="info">
          <h2>Expenses</h2>
          <span>
            {Object.values(categories).reduce((total, curr) => (total += curr), 0).toFixed(2)} BYN
          </span>
        </div>
        <div className="circle-container">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </section>
  );
}
