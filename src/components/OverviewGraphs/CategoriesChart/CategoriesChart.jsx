import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../../pages/Overview/Overview.module.scss';

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
import { getPurchasesStatisticForTime } from '../../../utils';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function CategoriesChart({ graphData, purchases }) {
  const [allExpensesRange, setAllExpensesRange] = useState(graphData.sorting[0].values[0].name);
  const [statistic, setStatistic] = useState(
    getPurchasesStatisticForTime(purchases, allExpensesRange),
  );
  const allExpensesChartData = graphData.formData(statistic);

  useEffect(() => {
    setStatistic(getPurchasesStatisticForTime(purchases, allExpensesRange));
  }, [purchases, allExpensesRange]);

  return (
    <div className={styles.statistic_block} id="all_expenses">
      <h1>{graphData.name}</h1>
      {graphData.sorting.map(({ name, values }) => (
        <div key={name}>
          <select name={name} id={name} onChange={(e) => setAllExpensesRange(e.target.value)}>
            {values.map(({ name, text }) => (
              <option value={name} key={name}>
                {text}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className={styles["chart-container"]}>
        <div className={styles.chart}>
          <Line options={graphData.options} data={allExpensesChartData} />
        </div>
      </div>
    </div>
  );
}

export default CategoriesChart;
