const secondsInPeriod = {
  day: 86400,
  week: 604800,
  month: 2419200,
  year: 29030400,
};

export const generateCategories = (purchases = [], period = null) => {
  const result = {};
  
  if (typeof period === 'string') {
    const now = Math.floor(new Date().getTime() / 1000);

    for (let { category, price, time } of purchases) {
      if (time > (now - secondsInPeriod[period])) {
        result[category] = (result[category] ? result[category] : 0) + +price;
      }
    }
  } else {
    for (let { category, price } of purchases) {
      result[category] = (result[category] ? result[category] : 0) + +price;
    }
  }

  return result;
}