// const purchases = [
//   { id: 2,    name: 'Bread',         category: 'Food',           price: '2',     time: '2022-07-26T11:37:05.071Z' },
//   { id: 3,    name: 'Another Bread', category: 'Food',           price: '1',     time: '2022-07-26T20:40:41.142Z' },
//   { id: 4,    name: 'sss',           category: 'Entertainment',  price: '2',     time: '2022-07-27T21:30:05.978Z' },
// ];

const timeOptions = {
  day: { every: 3600, labelsCount: 24, labelName: (date) => (`${date.getHours()}:00`) },
  week: { every: 86400, labelsCount: 7, labelName: (date) => (`${date.getDate()}.${date.getMonth() + 1}`) },
  month: { every: 86400, labelsCount: 31, labelName: (date) => (`${date.getDate()}.${date.getMonth() + 1}`) },
  year: { every: 2635200, labelsCount: 12, labelName: (date) => (`${new Date(0, date.getMonth()).toLocaleString('en-US', {month: 'long'})}`) },
};

export const getPurchasesStatisticForTime = (purchases, lastTime) => {
  const { every, labelsCount, labelName } = timeOptions[lastTime];
  const categoriesArr = [...new Set(purchases.map(el => el.category))];
  const categories = {};
  for (let i = 0, length = categoriesArr.length; i < length; i++) {
    categories[categoriesArr[i]] = 0;
  }
  const obj = {datasets: {}, labels: categoriesArr, data: {}};
  const date = Math.floor(new Date().getTime() / 1000);
  // const now = date + (every - (date % every));
  const now = date - (date % every);

  const everyMiliseconds = every * 1000;

  for (let i = 0; i < labelsCount; i++) {
    const date = new Date(now * 1000 - (everyMiliseconds * i));
    obj.datasets[Math.floor(date.getTime() / 1000)] = { label: labelName(date), money: {...categories} };
  }

  Object.keys(obj.datasets).forEach(time => {
    const minTime = +time;
    const maxTime = minTime + every;

    purchases.forEach((purchase) => {
      const purchaseTime = Math.floor(new Date(purchase.time).getTime() / 1000);

      if (purchaseTime > minTime && purchaseTime < maxTime) {
        obj.datasets[time].money[purchase.category] += parseFloat(purchase.price);
      }
    });
  });

  for (let i = 0, length = Object.keys(obj.datasets).length; i < length; i++) {
    const categories = obj.datasets[Object.keys(obj.datasets)[i]].money;
    const label = obj.datasets[Object.keys(obj.datasets)[i]].label;

    for (let category in categories) {
      if (typeof obj.data[category] !== 'object' || obj.data[category] === null) {
        obj.data[category] = {};
      }
      obj.data[category][label] = parseFloat(categories[category]).toFixed(2);
    }
  }

  // console.log(obj);
  return obj;
};

// console.log(JSON.stringify(getPurchasesStatisticForTime(purchases, 'week')));