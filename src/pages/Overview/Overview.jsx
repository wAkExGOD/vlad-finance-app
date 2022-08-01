import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getPurchasesStatisticForTime } from '../../utils';
import { colors } from '../../constants';
import { useEffect, useState } from 'react';

import styles from './Overview.module.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const charts = {
  allExpenses: {
    name: 'All expenses',
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
    formData: (stats) => (
      {
        labels: Object.keys(stats.datasets).map(date => stats.datasets[date].label),
        hoverBorderColor: 'white',
        datasets: [
          ...Object.keys(stats.data).map((category, index) => (
            {
              label: category,
              data: stats.data[category],
              borderColor: colors[index],
              backgroundColor: colors[index],
              tension: 0.25,
              pointRadius: 6,
              pointStyle: 'rectRounded',
              pointHoverBackgroundColor: 'white'
            }
          )),
        ]
      }
    ),
    sorting: [
      {
        name: 'date',
        values: [
          { name: 'day', text: 'Last day' },
          { name: 'week', text: 'Last week' },
          { name: 'month', text: 'Last month' },
          { name: 'year', text: 'Last year' },
        ],
      },
    ],
  }
};

export function Overview() {
  const [allExpensesRange, setAllExpensesRange] = useState(charts.allExpenses.sorting[0].values[0].name);
  const purchases = useSelector(state => state.purchases.items);  
  const [statistic, setStatistic] = useState(getPurchasesStatisticForTime(purchases, allExpensesRange));
  const allExpensesChartData = charts.allExpenses.formData(statistic);

  useEffect(() => {
    setStatistic(getPurchasesStatisticForTime(purchases, allExpensesRange));
  }, [purchases, allExpensesRange]);

  return (
    <section className={["app-section", styles.overview].join(' ')}>
      <div className={styles.statistic_block} id="all_expenses">
        <h1>{charts.allExpenses.name}</h1>
        { charts.allExpenses.sorting.map(({name, values}) => (
          <div key={name}>
            <select
              name={name}
              id={name}
              onChange={(e) => setAllExpensesRange(e.target.value)}>
              { values.map(({name, text}) => (
                <option value={name} key={name}>{text}</option>
              )) }
            </select>
          </div>
        )) }
        <div className={styles.chart}>
          <Line options={charts.allExpenses.options} data={allExpensesChartData} />
        </div>
      </div>
      <div className={styles.statistic_block} id="some_other"></div>
    </section>
  );
}
