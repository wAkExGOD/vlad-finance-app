import { colors } from './colors';

export const overviewCharts = {
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
    formData: (stats) => ({
      labels: Object.keys(stats.datasets).map((date) => stats.datasets[date].label),
      hoverBorderColor: 'white',
      datasets: [
        ...Object.keys(stats.data).map((category, index) => ({
          label: category,
          data: stats.data[category],
          borderColor: colors[index],
          backgroundColor: colors[index],
          tension: 0.25,
          pointRadius: 6,
          pointStyle: 'rectRounded',
          pointHoverBackgroundColor: 'white',
        })),
      ],
    }),
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
  },
};